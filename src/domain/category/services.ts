import * as DAO from "./dao.js";

export const CreateCategoryServices = async (data: any) => {
    try {
        await DAO.CreateCategoryDAO(data);

        return ({ message: "Category successful created." });
    } catch (error: any) {
        throw new Error("Something went wrong : " + error.message);
    }
}