import { boolean, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const contact = mysqlTable("contact", {
    code: varchar("code", { length: 50 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 255 }),
    address: text(),
    description: text(),
    isActive: boolean().default(true),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp()
});