import * as DAO from "./dao.js";
import { CategoryBody, CategoryFilters, CategoryParams } from "./schema.js";

export const GetAllCategoryServices = async (filters: CategoryFilters) => {
    try {
        const data = await DAO.GetAllCategoryDAO(filters);
        return data;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const GetCategoryByCode = async (code: CategoryParams) => {
    if(!code) {
        return ({ message: "Code cannot be empty." });
    }

    try {
        const data = await DAO.GetCategoryByCode(code);
        return data;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const CreateCategoryServices = async (data: CategoryBody) => {
    try {
        await DAO.CreateCategoryDAO(data);
        return ({ message: "Category successful created." });
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const UpdateCategoryServices = async (code: CategoryParams, data: CategoryBody) => {
    if(!code) {
        return ({ message: "Code cannot be empty." });
    }

    try {
        await DAO.UpdateCategoryDAO(code, data);
        return ({ message: "Category successful updated." });
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const DeleteCategoryServices = async (code: CategoryParams) => {
    if(!code) {
        return ({ message: "Code cannot be empty." });
    }

    try {
        await DAO.DeleteCategoryDAO(code);
        return ({ message: "Category successful deleted." });
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}