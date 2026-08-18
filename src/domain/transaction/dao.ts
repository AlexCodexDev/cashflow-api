import { between, desc, eq, like, sql } from "drizzle-orm";
import db from "../../config/db.js"
import { transaction } from "../../database/schema/transaction.js"
import { TransactionBody } from "./schema.js";
import { io } from "../../server.js";
import { wallet } from "../../database/schema/wallet.js";
import { category } from "../../database/schema/category.js";
import { contact } from "../../database/schema/contact.js";

const now = new Date();

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

export const CreateTransactionDAO = async (data: TransactionBody) => {
    await db.transaction(async (tx) => {
        const getWallet = await tx
            .select({
                currentBalance: wallet.currentBalance
            })
            .from(wallet)
            .where(eq(wallet.code, data.walletCode))
            .limit(1);

        if(!getWallet) {
            throw new Error("Wallet not found.");
        }

        let nowBalance = getWallet[0]?.currentBalance ?? 0;
        if(data.type === "INCOME") {
            nowBalance += data.amount;
        } else {
            nowBalance -= data.amount;
        }

        await tx
            .insert(transaction)
            .values({
                code: await getCode(),
                ...data,
                amount: data.amount,
            });

        await tx
            .update(wallet)
            .set({
                currentBalance: nowBalance
            })
            .where(eq(wallet.code, data.walletCode));

        io.emit("transaction:changed");
    });
}
