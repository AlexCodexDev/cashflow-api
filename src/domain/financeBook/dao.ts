import { isNull } from "drizzle-orm"
import db from "../../config/db.js"
import { financeBook } from "../../database/schema/financeBook.js"

export const GetAllFinanceBookDAO = async () => {
    const data = db
        .select()
        .from(financeBook)
        .where(isNull(financeBook.deletedAt))

    return data;
}