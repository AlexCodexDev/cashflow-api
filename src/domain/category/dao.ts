import { desc, eq, isNull, like } from "drizzle-orm";
import db from "../../config/db.js";
import { category } from "../../database/schema/category.js";

export const GetAllCategoryDAO = async () => {
    try {
        const data = await db.select().from(category).where(isNull(category.deletedAt));
        return data;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const GetCategoryByCode = async (code: string) => {
    try {
        const data = await db.select().from(category).where(eq(category.code, code));
        return data;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const CreateCategoryDAO = async (data: any) => {
    try {
        // Get month year
        const now = new Date();
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
        return category;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const UpdateCategoryDAO = async (data: any) => {
    try {

    } catch (error: any) {
        
    }
}