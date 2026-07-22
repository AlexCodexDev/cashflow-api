import * as DAO from "./dao.js";

export const GetAllCategoryServices = async () => {
    try {
        const data = await DAO.GetAllCategoryDAO();

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