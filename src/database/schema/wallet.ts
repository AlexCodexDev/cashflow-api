import { boolean, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { payment } from "./payment.js";
import { relations } from "drizzle-orm";

export const wallet = mysqlTable("wallet", {
    code: varchar("code", { length: 50 }).primaryKey(),
    paymentCode: varchar("paymentCode", { length: 50 }).notNull().references(() => payment.code),
    name: varchar("name", { length: 100 }).notNull(),
    description: text(),
    isActive: boolean().default(true),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp()
});

export const walletRelations = relations(wallet, ({ one }) => ({
    payment: one(payment, {
        fields: [wallet.paymentCode],
        references: [payment.code]
    })
}));