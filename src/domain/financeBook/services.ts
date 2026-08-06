import * as DAO from "./dao.js"
import { FinanceBookFilter, FinanceBookParams, FinanceBookTypes } from "./schema.js";

export const GetAllFinanceBookServices = async (filter: FinanceBookFilter) => {
    const data = await DAO.GetAllFinanceBookDAO(filter);
    return data;
}

export const GetFinanceBookByCodeServices = async (code: FinanceBookParams) => {
    const data = await DAO.GetFinanceBookByCodeDAO(code);
    return data;
}

export const CreateFinanceBookServices = async (data: FinanceBookTypes) => {
    await DAO.CreateFinanceBookDAO(data);
    return ({ message: "Book successful created." });
}

export const UpdateFinanceBOokServices = async (code: FinanceBookParams, data: FinanceBookTypes) => {
    await DAO.UpdateFinanceBookDAO(code, data);
    return ({ message: "Book successful updated." });
}