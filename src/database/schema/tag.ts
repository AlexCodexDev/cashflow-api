import { relations } from "drizzle-orm";
import { boolean, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { transactionTag } from "./transactionTag.js";

export const tag = mysqlTable("tag", {
    code: varchar("code", { length: 50 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    color: varchar("color", { length: 20 }),
    description: text(),
    isActive: boolean().default(true),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp()
});

export const tagRelations = relations(tag, ({ many }) => ({
    transactionTag: many(transactionTag)
}));