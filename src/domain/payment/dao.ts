import { and, desc, eq, isNull, like, or } from "drizzle-orm";
import db from "../../config/db.js";
import { payment } from "../../database/schema/payment.js";
import { PaymentBody, PaymentFilter } from "./schema.js";
import { io } from "../../server.js";
import { CheckCodeTypes } from "../../types/types.js";

const now = new Date();

export async function getCode() {
    // Get month year
    const yearMonth = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, "0");
    const prefix = `PYT-${yearMonth}-`;

    // Get latest payment
    const latestPayment = (
        await db
            .select()
            .from(payment)
            .where(like(payment.code, `${prefix}%`))
            .orderBy(desc(payment.code))
            .limit(1)
    )[0];

    let sequence = 1;
    if(latestPayment) {
        sequence = Number(latestPayment.code.split("-")[2]) + 1;
    }

    return `${prefix}${String(sequence).padStart(3, "0")}`;
}

export const GetAllPaymentDAO = async ({ searchCode, searchName }: PaymentFilter) => {
    const conditions = [];

    if(searchCode?.trim()) {
        conditions.push(like(payment.code, `%${searchCode}%`));
    }

    if(searchName?.trim()) {
        conditions.push(like(payment.name, `%${searchName}%`));
    }

    const data = await db
        .select()
        .from(payment)
        .where(
            and(
                isNull(payment.deletedAt),
                conditions.length ? or(...conditions) : undefined
            )
        );
    
    return data;
}

export const GetPaymentByCodeDAO = async ({ code }: CheckCodeTypes) => {
    const data = await db
        .select()
        .from(payment)
        .where(eq(payment.code, code));

    return data[0];
}

export const CreatePaymentDAO = async (data: PaymentBody) => {
    await db
        .insert(payment)
        .values({
            code: await getCode(),
            name: data.name,
            color: data.color,
            icon: data.icon,
            description: data.description,
            isActive: true,
            createdAt: now
        });

    io.emit("payment:changed");
}

export const UpdatePaymentDAO = async ({ code }: CheckCodeTypes, data: PaymentBody) => {
    await db
        .update(payment)
        .set({
            name: data.name,
            color: data.color,
            icon: data.icon,
            description: data.description,
            isActive: true,
            updatedAt: now
        })
        .where(eq(payment.code, code));

    io.emit("payment:changed");
}

export const DeletePaymentDAO = async ({ code }: CheckCodeTypes) => {
    await db
        .update(payment)
        .set({
            deletedAt: now
        })
        .where(eq(payment.code, code));

    io.emit("payment:changed");
}