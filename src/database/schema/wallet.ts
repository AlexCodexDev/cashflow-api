import { boolean, decimal, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { payment } from "./payment.js";
import { relations } from "drizzle-orm";
import { financeBook } from "./financeBook.js";

export const wallet = mysqlTable("wallet", {
    code: varchar("code", { length: 50 }).primaryKey(),
    financeBookCode: varchar("financeBookCode", { length: 50 })
        .notNull()
        .references(() => financeBook.code),
    paymentCode: varchar("paymentCode", { length: 50 })
        .references(() => payment.code),
    name: varchar("name", { length: 100 }).notNull(),
    openingBalance: decimal("openingBalance", { precision: 12, scale: 2, mode: "number" }).notNull(),
    currentBalance: decimal("currentBalance", { precision: 12, scale: 2, mode: "number" }).notNull(),
    isActive: boolean().default(true),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp()
});

export const walletRelations = relations(wallet, ({ one }) => ({
    payment: one(payment, {
        fields: [wallet.paymentCode],
        references: [payment.code]
    }),
    financeBook: one(financeBook, {
        fields: [wallet.financeBookCode],
        references: [financeBook.code]
    })
}));