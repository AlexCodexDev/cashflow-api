import { relations } from "drizzle-orm";
import { boolean, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { wallet } from "./wallet.js";

export const payment = mysqlTable("payment", {
    code: varchar("code", { length: 50 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull(), 
    icon: varchar("icon", { length: 50 }), 
    color: varchar("color", { length: 20 }), 
    description: text(), 
    isActive: boolean().default(true),
    createdAt: timestamp().defaultNow(), 
    updatedAt: timestamp(),
    deletedAt: timestamp()
});

export const paymentRelations = relations(payment, ({ many }) => ({
    wallets: many(wallet)
}));