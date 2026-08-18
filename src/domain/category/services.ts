import { CheckCodeTypes, CheckFinanceBookCodeTypes } from "../../types/types.js";
import * as DAO from "./dao.js";
import { CategoryBody, CategoryFilters } from "./schema.js";

export const GetAllCategoryServices = async (filters: CategoryFilters) => {
    const data = await DAO.GetAllCategoryDAO(filters);
    return data;
}

export const GetCategoryByCodeServices = async (code: CheckCodeTypes) => {
    const data = await DAO.GetCategoryByCodeDAO(code);
    return data;
}

export const GetCategoryByFinanceBookCodeServices = async (code: CheckFinanceBookCodeTypes) => {
    const data = await DAO.GetCategoryByFinanceBookCodeDAO(code);
    return data;
}

export const CreateCategoryServices = async (data: CategoryBody) => {
    await DAO.CreateCategoryDAO(data);
    return ({ message: "Category successful created." });
}

export const UpdateCategoryServices = async (code: CheckCodeTypes, data: CategoryBody) => {
    await DAO.UpdateCategoryDAO(code, data);
    return ({ message: "Category successful updated." });
}

export const DeleteCategoryServices = async (code: CheckCodeTypes) => {
    await DAO.DeleteCategoryDAO(code);
    return ({ message: "Category successful deleted." });
}