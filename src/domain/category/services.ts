import * as DAO from "./dao.js";

export const GetAllCategoryServices = async (filters: any) => {
    try {
        const data = await DAO.GetAllCategoryDAO(filters);

        return data;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const GetCategoryByCode = async (code: string) => {
    try {
        const data = await DAO.GetCategoryByCode(code);
        return data;
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const CreateCategoryServices = async (data: any) => {
    try {
        await DAO.CreateCategoryDAO(data);

        return ({ message: "Category successful created." });
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const UpdateCategoryServices = async (data: any, code: string) => {
    try {
        if(!code) {
            return ({ message: "Code cannot be empty." });
        }

        await DAO.UpdateCategoryDAO(data, code);

        return ({ message: "Category successful updated." });
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}

export const DeleteCategoryServices = async (code: string) => {
    try {
        await DAO.DeleteCategoryDAO(code);

        return ({ message: "Category successful deleted." });
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}