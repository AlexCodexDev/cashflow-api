import { boolean, mysqlEnum, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    code: varchar("code", { length: 100 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    birthDate: timestamp(),
    phone: varchar("phone", { length: 20 }).notNull(),
    gender: mysqlEnum(["NONE","MAN","WOMAN"]).default("NONE"),
    role: mysqlEnum(["USER","ADMIN"]).default("USER"),
    isActive: boolean().default(true),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
    deletedAt: timestamp(),
});