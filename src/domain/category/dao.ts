import { and, desc, eq, isNull, like, or } from "drizzle-orm";
import db from "../../config/db.js";
import { category } from "../../database/schema/category.js";
import { io } from "../../server.js";
import { CategoryBody, CategoryFilters } from "./schema.js";
import { CheckCodeTypes, CheckFinanceBookCodeSchema, CheckFinanceBookCodeTypes } from "../../types/types.js";

const now = new Date();

export async function getCode() {
    // Get month year
    const yearMonth = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, "0");
    const prefix = `CTY-${yearMonth}-`;

    // Get latest category
    const latestCat = (
        await db
        .select({
            code: category.code
        })
        .from(category)
        .where(like(category.code, `${prefix}%`))
        .orderBy(desc(category.code))
        .limit(1)
    )[0];

    let sequence = 1;
    if(latestCat) {
        sequence = Number(latestCat.code.split("-")[2]) + 1;
    }

    return `${prefix}${String(sequence).padStart(3, "0")}`;
}

export const GetAllCategoryDAO = async ({ searchCode, searchName }: CategoryFilters) => {
    const conditions = [];

    if(searchCode?.trim()) {
        conditions.push(like(category.code, `%${searchCode}%`));
    }

    if(searchName?.trim()) {
        conditions.push(like(category.name, `%${searchName}%`));
    }

    const data = await db
        .select()
        .from(category)
        .where(
            and (
                isNull(category.deletedAt),
                conditions.length ? or(...conditions) : undefined
            )
        );

    return data;
}

export const GetCategoryByCodeDAO = async ({ code }: CheckCodeTypes) => {
    const data = await db
        .select()
        .from(category)
        .where(eq(category.code, code));
    return data[0];
}

export const GetCategoryByFinanceBookCodeDAO = async ({ financeBookCode }: CheckFinanceBookCodeTypes) => {
    const data = await db
        .select({
            code: category.code,
            name: category.name
        })
        .from(category)
        .where(eq(category.financeBookCode, financeBookCode));

    return data;
}

export const CreateCategoryDAO = async (data: CategoryBody) => {
    await db.insert(category).values({
        code: await getCode(),
        financeBookCode: data.financeBookCode,
        name: data.name,
        color: data.color ?? null,
        icon: data.icon ?? null,
        description: data.description ?? null,
        isActive: true,
        createdAt: now,
    });

    io.emit("category:changed");
}

export const UpdateCategoryDAO = async ({ code }: CheckCodeTypes, data: CategoryBody) => {
    await db
        .update(category)
        .set({
            name: data.name,
            description: data.description,
            color: data.color,
            icon: data.icon,
            isActive: true,
            updatedAt: now
        })
        .where(eq(category.code, code));

    io.emit("category:changed");
}

export const DeleteCategoryDAO = async ({ code }: CheckCodeTypes) => {
    await db
        .update(category)
        .set({ deletedAt: now })
        .where(eq(category.code, code));

    io.emit("category:changed");
}