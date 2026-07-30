import { and, desc, eq, isNull, like, or } from "drizzle-orm";
import db from "../../config/db.js";
import { tag } from "../../database/schema/tag.js";
import { TagBody, TagFilters } from "./schema.js";
import { io } from "../../server.js";
import { CheckCodeTypes } from "../../types/types.js";

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
}

export const GetTagByCodeDAO = async ({ code }: CheckCodeTypes) => {
    const data = (await db.select().from(tag).where(eq(tag.code, code)))[0];
    return data;
}

export const CraeteTagDAO = async (data: TagBody) => {
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
}

export const UpdateTagDAO = async ({ code }: CheckCodeTypes, data: TagBody) => {
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
}

export const DeleteTagDAO = async ({ code }: CheckCodeTypes) => {
    await db
        .update(tag)
        .set({
            deletedAt: now
        })
        .where(eq(tag.code, code));

    io.emit("tag:changed");
}