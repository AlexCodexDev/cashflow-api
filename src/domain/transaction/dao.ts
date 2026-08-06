import { desc, like } from "drizzle-orm";
import db from "../../config/db.js"
import { transaction } from "../../database/schema/transaction.js"
import { TransactionBody } from "./schema.js";
import { io } from "../../server.js";

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
    const data = await db
        .select()
        .from(transaction);
    
    return data;
}

export const CreateTransactionDAO = async (data: TransactionBody) => {
    await db
        .insert(transaction)
        .values({
            code: await getCode(),
            ...data,
            amount: data.amount.toString(),
            createdAt: now
        });

    io.emit("transaction:changed");
}
