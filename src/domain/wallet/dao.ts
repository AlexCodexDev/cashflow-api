import { and, desc, eq, isNull, like, or } from "drizzle-orm";
import db from "../../config/db.js";
import { payment } from "../../database/schema/payment.js";
import { wallet } from "../../database/schema/wallet.js";
import { WalletBody, WalletFilter } from "./schema.js";
import { io } from "../../server.js";
import { CheckCodeTypes, CheckFinanceBookCodeSchema, CheckFinanceBookCodeTypes } from "../../types/types.js";

const now = new Date();

export async function getCode() {
    const yearMonth = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, "0");
    const prefix = `WAL-${yearMonth}-`;

    const latestWallet = (
        await db
        .select({
            code: wallet.code
        })
        .from(wallet)
        .where(like(wallet.code, `${prefix}%`))
        .orderBy(desc(wallet.code))
        .limit(1)
    )[0];

    let sequence = 1;
    if(latestWallet) {
        sequence = Number(latestWallet.code.split("-")[2]) + 1;
    }

    return `${prefix}${String(sequence).padStart(3, "0")}`;
}

export const GetAllWalletDAO = async ({ searchCode, searchName }: WalletFilter) => {
    const conditions = [];

    if(searchCode?.trim()) {
        conditions.push(like(wallet.code, `%${searchCode}%`));
    }

    if(searchName?.trim()) {
        conditions.push(like(wallet.name, `%${searchName}%`));
    }

    const data = await db
        .select({
            code: wallet.code,
            name: wallet.name,
            payment: {
                code: payment.code,
                name: payment.name
            }
        })
        .from(wallet)
        .leftJoin(payment, eq(wallet.paymentCode, payment.code))
        .where(
            and(
                isNull(wallet.deletedAt),
                conditions.length ? or(...conditions) : undefined
            )
        );

    return data;
}

export const GetWalletByCodeDAO = async ({ code }: CheckCodeTypes) => {
    const data = await db
        .select({
            code: wallet.code,
            name: wallet.name
        })
        .from(wallet)
        .where(eq(wallet.code, code));

    return data[0];
}

export const GetWalletByFinanceBookCodeDAO = async ({ financeBookCode }: CheckFinanceBookCodeTypes) => {
    const data = await db
        .select({
            code: wallet.code,
            name: wallet.name
        })
        .from(wallet)
        .where(eq(wallet.financeBookCode, financeBookCode));

    return data;
}

export const CreateWalletDAO = async (data: WalletBody) => {
    await db
        .insert(wallet)
        .values({
            code: await getCode(),
            name: data.name,
            financeBookCode: data.financeBookCode,
            openingBalance: data.openingBalance,
            currentBalance: data.currentBalance,
            isActive: true,
        });

    io.emit("wallet:changed");
}

export const UpdateWalletDAO = async ({ code }: CheckCodeTypes, data: WalletBody) => {
    await db
        .update(wallet)
        .set({
            name: data.name,
            openingBalance: data.openingBalance,
            currentBalance: data.currentBalance,
            updatedAt: now
        })
        .where(eq(wallet.code, code));

    io.emit("wallet:changed");
}

export const DeleteWalletDAO = async ({ code }: CheckCodeTypes) => {
    await db
        .update(wallet)
        .set({
            deletedAt: now
        })
        .where(eq(wallet.code, code));

    io.emit("wallet:changed");
}