import { decimal, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { category } from "./category.js";
import { payment } from "./payment.js";
import { wallet } from "./wallet.js";
import { contact } from "./contact.js";
import { relations } from "drizzle-orm";

export const transaction = mysqlTable("transaction", {
    code: varchar("code", { length: 50 }).primaryKey(),
    categoryCode: varchar("categoryCode", { length: 50 })
        .notNull()
        .references(() => category.code),
    walletCode: varchar("walletCode", { length: 50 })
        .notNull()
        .references(() => wallet.code),
    contactCode: varchar("contactCode", { length: 50 })
        .references(() => contact.code),
    name: varchar("name", { length: 100 }).notNull(),
    amount: decimal("amount", { precision: 12, scale: 2, mode: "number" }).notNull(),
    type: mysqlEnum(["INCOME","EXPENSE"]).notNull(),
    icon: varchar("icon", { length: 50 }),
    color: varchar("color", { length: 20 }),
    description: text(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
});

export const transactionRelations = relations(transaction, ({ one }) => ({
    category: one(category, {
        fields: [transaction.categoryCode],
        references: [category.code]
    }),
    wallet: one(wallet, {
        fields: [transaction.walletCode],
        references: [wallet.code]
    }),
    contact: one(contact, {
        fields: [transaction.contactCode],
        references: [contact.code]
    }),
}));