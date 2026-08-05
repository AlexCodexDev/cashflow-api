import { desc, eq, isNull, like } from "drizzle-orm"
import db from "../../config/db.js"
import { financeBook } from "../../database/schema/financeBook.js"
import { FinanceBookParams, FinanceBookTypes } from "./schema.js";
import { io } from "../../server.js";

const now = new Date();

export async function getCode() {
    const monthYear = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, "0");
    const prefix = `FIB-${monthYear}-`;

    const latestFB = (
        await db
            .select()
            .from(financeBook)
            .where(like(financeBook.code, `${prefix}%`))
            .orderBy(desc(financeBook.code))
            .limit(1)
    )[0];

    let sequence = 1;
    if(latestFB) {
        sequence = Number(latestFB.code.split("-")[2]) + 1;
    }

    return `${prefix}${String(sequence).padStart(3, "0")}`;
}

export const GetAllFinanceBookDAO = async () => {
    const data = db
        .select()
        .from(financeBook)
        .where(isNull(financeBook.deletedAt));

    return data;
}

export const GetFinanceBookByCodeDAO = async ({ code }: FinanceBookParams) => {
    const data = (
        await db
            .select({
                code: financeBook.code,
                name: financeBook.name,
                type: financeBook.type,
                description: financeBook.description,
                logo: financeBook.logo
            })
            .from(financeBook)
            .where(eq(financeBook.code, code))
    )[0];
    
    return data;
}

export const CreateFinanceBookDAO = async (data: FinanceBookTypes) => {
    await db
        .insert(financeBook)
        .values({
            code: await getCode(),
            name: data.name,
            type: data.type,
            description: data.description,
            logo: data.logo,
            createdAt: now
        });

    io.emit("financeBook:changed");
}

export const UpdateFinanceBookDAO = async ({ code }: FinanceBookParams, data: FinanceBookTypes) => {
    await db
        .update(financeBook)
        .set({
            name: data.name,
            type: data.type,
            description: data.description,
            logo: data.logo,
            updatedAt: now
        })
        .where(eq(financeBook.code, code));

    io.emit("financeBook:changed");
}