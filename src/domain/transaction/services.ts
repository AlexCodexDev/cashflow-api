import { CheckCodeTypes } from "../../types/types.js";
import * as DAO from "./dao.js"
import { TransactionBody } from "./schema.js";

export const GetAllTransactionServices = async () => {
    const data = await DAO.GetAllTransactionDAO();
    return data;
}

export const GetTransactionByCodeServices = async (code: CheckCodeTypes) => {
    const data = await DAO.GetTransactionByCodeDAO(code);
    return data;
}

export const CreateTransactionServices = async (data: TransactionBody) => {
    await DAO.CreateTransactionDAO(data);
    return ({ message: "Transaction successful created." });
}

export const UpdateTransactionServices = async (code: CheckCodeTypes, data: TransactionBody) => {
    await DAO.UpdateTransactionDAO(code, data);
    return ({ message: "Transaction successful updated." });
}

export const DeleteTransactionServices = async (code: CheckCodeTypes) => {
    await DAO.DeleteTransactionDAO(code);
    return ({ message: "Transaction successful deleted." });
}