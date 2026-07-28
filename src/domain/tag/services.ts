import * as DAO from "./dao.js";
import { TagBody, TagParams } from "./schema.js";

export const GetTagsServices = async () => {
    try {
        const data = await DAO.GetTagsDAO();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetTagByCodeServices = async (code: TagParams) => {
    if(!code) {
        return ({ message: "Code cannot be empty." });
    }

    try {
        const data = await DAO.GetTagByCodeDAO(code);
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateTagServices = async (data: TagBody) => {
    try {
        await DAO.CraeteTagDAO(data);
        return ({ message: "Tag successful created." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateTagServices = async (code: TagParams, data: TagBody) => {
    if(!code) {
        return ({ message: "Code cannot be empty." });
    }

    try {
        await DAO.UpdateTagDAO(code, data);
        return ({ message: "Tag successful updated." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeletTagServices = async (code: TagParams) => {
    if(!code) {
        return ({ message: "Code cannot be empty." });
    }
    
    try {
        await DAO.DeleteTagDAO(code);
        return ({ message: "Tag successful deleted." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}