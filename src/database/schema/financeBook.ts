import { relations } from "drizzle-orm";
import { mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { wallet } from "./wallet.js";

export const financeBook = mysqlTable("finance_book", {
    code: varchar("code", { length: 50 }).primaryKey(),
    type: mysqlEnum(["PERSONAL","BUSSINESS"]).default("PERSONAL").notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    logo: text(),
    description: text(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp()
});

export const financeBookRelations = relations(financeBook, ({ many }) => ({
    wallet: many(wallet)
}));