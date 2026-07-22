import { boolean, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const category = mysqlTable("category", {
    code: varchar("code", { length: 50 }).primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    icon: varchar("icon", { length: 50 }),
    color: varchar("color", { length: 10 }),
    description: text(),
    isActive: boolean().default(true),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp()
});