import { relations } from "drizzle-orm";
import { boolean, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { transaction } from "./transaction.js";

export const category = mysqlTable("category", {
    code: varchar("code", { length: 50 }).primaryKey(),
    financeBookCode: varchar("financeBookCode", { length: 20 }).notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    icon: varchar("icon", { length: 50 }),
    color: varchar("color", { length: 20 }),
    description: text(),
    isActive: boolean().default(true),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp()
});

export const categoryRelations = relations(category, ({ many }) => ({
    transaction: many(transaction)
}));