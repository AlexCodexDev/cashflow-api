import * as DAO from "./dao.js"
import { TransactionBody } from "./schema.js";

export const GetAllTransactionServices = async () => {
    const data = await DAO.GetAllTransactionDAO();
    return data;
}

export const CreateTransactionServices = async (data: TransactionBody) => {
    await DAO.CreateTransactionDAO(data);
    return ({ message: "Transaction successful created." });
}