import { relations } from "drizzle-orm";
import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { tag } from "./tag.js";
import { transaction } from "./transaction.js";

export const transactionTag = mysqlTable("transaction_tag", {
    code: varchar("code", { length: 50 }).primaryKey(),
    transactionCode: varchar("transactionCode", { length: 50 })
        .notNull()
        .references(() => transaction.code), 
    tagCode: varchar("tagCode", { length: 50 })
        .notNull()
        .references(() => tag.code),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp() 
});

export const transactionTagRelations = relations(transactionTag, ({ one }) => ({
    transaction: one(transaction, {
        fields: [transactionTag.transactionCode],
        references: [transaction.code]
    }),
    tag: one(tag, {
        fields: [transactionTag.tagCode],
        references: [tag.code]
    })
}));