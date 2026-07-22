import { boolean, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const wallet = mysqlTable("wallet", {
    code: varchar("code", { length: 50 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    type: mysqlEnum(['CASH','BANK','E_WALLET']).default('CASH'),
    description: text(),
    isActive: boolean().default(true),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp()
});