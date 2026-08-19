import { between, desc, eq, like, sql } from "drizzle-orm";
import db from "../../config/db.js"
import { transaction } from "../../database/schema/transaction.js"
import { TransactionBody, TransactionParams } from "./schema.js";
import { io } from "../../server.js";
import { wallet } from "../../database/schema/wallet.js";
import { category } from "../../database/schema/category.js";
import { contact } from "../../database/schema/contact.js";
import { financeBook } from "../../database/schema/financeBook.js";

type DbTransaction = Parameters<
    Parameters<typeof db.transaction>[0]
>[0];

const now = new Date();

// START: Helper
const getWalletCurrentBalance = async (
    tx: DbTransaction,
    walletCode: string,
    type: "INCOME" | "EXPENSE",
    amount: number
) => {
    const getWallet = await tx
        .select({
            currentBalance: wallet.currentBalance
        })
        .from(wallet)
        .where(eq(wallet.code, walletCode))
        .limit(1);
    
    const walletData = getWallet[0];

    if(!walletData) {
        throw new Error("Wallet not found.");
    }

    let nowBalance = Number(walletData.currentBalance);

    if(type === "INCOME") {
        nowBalance += Number(amount);
    } else {
        nowBalance -= Number(amount);
    }

    return nowBalance;
}

const reverseTransactionBalance = (
    balance: number,
    type: "INCOME" | "EXPENSE",
    amount: number
) => {
    if(type === "INCOME") {
        return balance - amount;
    }

    return balance + amount;
}

const applyTransactionBalance = (
    balance: number,
    type: "INCOME" | "EXPENSE",
    amount: number
) => {
    if(type === "INCOME") {
        return balance +  amount;
    }

    return balance - amount;
}
// END: Helper

export async function getCode() {
    const monthYear = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, "0");
    const prefix = `TRX-${monthYear}-`;

    const latestTrans = (
        await db
            .select()
            .from(transaction)
            .where(like(transaction.code, `${prefix}%`))
            .orderBy(desc(transaction.code))
            .limit(1)
    )[0];

    let sequence = 1;
    if(latestTrans) {
        sequence = Number(latestTrans.code.split("-")[2]) + 1;
    }

    return `${prefix}${String(sequence).padStart(3, "0")}`;
}

export const GetAllTransactionDAO = async () => {
    const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
    );

    const data = await db
        .select({
            code: transaction.code,
            categoryCode: transaction.categoryCode,
            walletCode: transaction.walletCode,
            contactCode: transaction.contactCode,
            contactName: contact.name,
            categoryName: category.name,
            walletName: wallet.name,
            name: transaction.name,
            amount: transaction.amount,
            type: transaction.type,
            description: transaction.description,
            date: transaction.createdAt
        })
        .from(transaction)
        .where(
            between(transaction.createdAt, startOfMonth, endOfMonth)
        )
        .leftJoin(
            category,
            eq(transaction.categoryCode, category.code)
        )
        .leftJoin(
            wallet,
            eq(transaction.walletCode, wallet.code)
        )
        .leftJoin(
            contact,
            eq(transaction.contactCode, contact.code)
        );

    const totalIncome = data.filter((item) => item.type === "INCOME").reduce((total, item) => total + Number(item.amount), 0);
    const totalExpense = data.filter((item) => item.type === "EXPENSE").reduce((total, item) => total + Number(item.amount), 0);
    
    return {
        data: data,
        income: totalIncome,
        expense: totalExpense
    };
}

export const GetTransactionByCodeDAO = async ({ code }: TransactionParams) => {
    const data = await db
        .select({
            code: transaction.code,
            categoryCode: transaction.categoryCode,
            walletCode: transaction.walletCode,
            contactCode: transaction.contactCode,
            name: transaction.name,
            amount: transaction.amount,
            type: transaction.type,
            description: transaction.description
        })
        .from(transaction)
        .where(eq(transaction.code, code));

    return data[0];
}

export const CreateTransactionDAO = async (data: TransactionBody) => {
    await db.transaction(async (tx) => {
        await tx
            .insert(transaction)
            .values({
                code: await getCode(),
                ...data,
                amount: data.amount,
            });

        const currentBalance = await getWalletCurrentBalance(
            tx,
            data.walletCode,
            data.type,
            data.amount
        );

        await tx
            .update(wallet)
            .set({
                currentBalance
            })
            .where(eq(wallet.code, data.walletCode));

        io.emit("transaction:changed");
    });
}

export const UpdateTransactionDAO = async ({ code }: TransactionParams, data: TransactionBody) => {
    await db.transaction(async (tx) => {
        const oldTransaction = await tx
            .select({
                code: transaction.code,
                walletCode: transaction.walletCode,
                amount: transaction.amount,
                type: transaction.type
            })
            .from(transaction)
            .where(eq(transaction.code, code))
            .limit(1);

        const oldData = oldTransaction[0];

        if(!oldData) {
            throw new Error('Transaction not found.');
        }

        const isFinancialChanged =
            oldData.walletCode !== data.walletCode ||
            Number(oldData.amount) !== Number(data.amount) ||
            oldData.type !== data.type;

        if(isFinancialChanged) {
            const oldWalletResult = await tx
                .select({
                    code: wallet.code,
                    currentBalance: wallet.currentBalance
                })
                .from(wallet)
                .where(eq(wallet.code, oldData.walletCode))
                .limit(1);

            const oldWallet = oldWalletResult[0];

            if(!oldWallet) {
                throw new Error("Old wallet not found.");
            }

            const oldWalletBalance = reverseTransactionBalance(
                Number(oldWallet.currentBalance),
                oldData.type,
                Number(oldData.amount)
            );

            await tx
                .update(wallet)
                .set({
                    currentBalance: oldWalletBalance
                })
                .where(eq(wallet.code, oldData.walletCode));

            const newWalletResult = await tx
                .select({
                    code: wallet.code,
                    currentBalance: wallet.currentBalance
                })
                .from(wallet)
                .where(eq(wallet.code, data.walletCode))
                .limit(1);
        
            const newWallet = newWalletResult[0];

            if(!newWallet) {
                throw new Error("New wallet not found.");
            }

            const newWalletBalance = applyTransactionBalance(
                Number(newWallet.currentBalance),
                data.type,
                Number(data.amount)
            );

            await tx
                .update(wallet)
                .set({
                    currentBalance: newWalletBalance
                })
                .where(eq(wallet.code, data.walletCode));
        }

        await tx
            .update(transaction)
            .set({
                name: data.name,
                categoryCode: data.categoryCode,
                walletCode: data.walletCode,
                contactCode: data.contactCode,
                amount: data.amount,
                type: data.type,
                description: data.description,
                updatedAt: now
            })
            .where(eq(transaction.code, code));

        io.emit("transaction:changed");
    });
}
