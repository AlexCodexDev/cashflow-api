import { and, desc, eq, isNull, like, or } from "drizzle-orm";
import db from "../../config/db.js";
import { category } from "../../database/schema/category.js";
import { io } from "../../server.js";
import { CategoryFilters } from "./schema.js";

const now = new Date();

export const GetAllCategoryDAO = async ({ searchCode, searchName }: CategoryFilters) => {
    const conditions = [];

    if(searchCode?.trim()) {
        conditions.push(like(category.code, `%${searchCode}%`));
    }

    if(searchName?.trim()) {
        conditions.push(like(category.name, `%${searchName}%`));
    }

    try {
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
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const GetCategoryByCode = async (code: string) => {
    try {
        const data = await db.select().from(category).where(eq(category.code, code));
        return data[0];
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const CreateCategoryDAO = async (data: any) => {
    try {
        // Get month year
        const yearMonth = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, "0");
        const prefix = `CTY-${yearMonth}-`;

        // Get latest category
        const latestCat = (
            await db
            .select()
            .from(category)
            .where(like(category.code, `${prefix}%`))
            .orderBy(desc(category.code))
            .limit(1)
        )[0];

        let sequence = 1;
        if(latestCat) {
            sequence = Number(latestCat.code.split("-")[2]) + 1;
        }

        const code = `${prefix}${String(sequence).padStart(3, "0")}`;

        await db.insert(category).values({
            code: code,
            name: data.name,
            color: data.color,
            icon: data.icon,
            description: data.description,
            isActive: true,
            createdAt: now,
        });

        io.emit("category:changed");

        return category;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const UpdateCategoryDAO = async (data: any, code: string) => {
    try {
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
        
        return category;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const DeleteCategoryDAO = async (code: string) => {
    try {
        await db
            .update(category)
            .set({ deletedAt: now })
            .where(eq(category.code, code));

        io.emit("category:changed");

        return category;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}