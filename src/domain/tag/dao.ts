import { and, desc, eq, isNull, like, or } from "drizzle-orm";
import db from "../../config/db.js";
import { tag } from "../../database/schema/tag.js";
import { TagBody, TagFilters, TagParams } from "./schema.js";
import { io } from "../../server.js";

const now = new Date();

export async function getCode() {
    // Get month year
    const yearMonth = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, "0");
    const prefix = `TAG-${yearMonth}-`;

    // Get latest tag
    const latestTag = (
        await db
            .select()
            .from(tag)
            .where(like(tag.code, `${prefix}%`))
            .orderBy(desc(tag.code))
            .limit(1)
    )[0];

    let sequence = 1;
    if(latestTag) {
        sequence = Number(latestTag.code.split("-")[2]) + 1;
    }

    return `${prefix}${String(sequence).padStart(3, "0")}`;
}

export const GetAllTagsDAO = async ({ searchCode, searchName }: TagFilters) => {
    const conditions = [];

    if(searchCode?.trim()) {
        conditions.push(like(tag.code, `%${searchCode}%`));
    }

    if(searchName?.trim()) {
        conditions.push(like(tag.name, `%${searchName}%`));
    }

    try {
        const data = await db
            .select()
            .from(tag)
            .where(
                and(
                    isNull(tag.deletedAt),
                    conditions.length ? or(...conditions) : undefined
                )
            );
        return data;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const GetTagByCodeDAO = async ({ code }: TagParams) => {
    try {
        const data = (await db.select().from(tag).where(eq(tag.code, code)))[0];
        return data;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const CraeteTagDAO = async (data: TagBody) => {
    try {
        await db
            .insert(tag)
            .values({
                code: await getCode(),
                name: data.name,
                color: data.color,
                description: data.description,
                isActive: true,
                createdAt: now
            });

        io.emit("tag:changed");

        return tag;
    } catch (error: any) {
        throw new Error("Somthing went wrong : " + error.message);
    }
}

export const UpdateTagDAO = async ({ code }: TagParams, data: TagBody) => {
    try {
        await db
            .update(tag)
            .set({
                name: data.name,
                description: data.description,
                color: data.color,
                isActive: true,
                updatedAt: now
            })
            .where(eq(tag.code, code));

        io.emit("tag:changed");

        return tag;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const DeleteTagDAO = async ({ code }: TagParams) => {
    try {
        await db
            .update(tag)
            .set({
                deletedAt: now
            })
            .where(eq(tag.code, code));

        io.emit("tag:changed");

        return tag;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}