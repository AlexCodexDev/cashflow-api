import { CheckCodeTypes } from "../../types/types.js";
import * as DAO from "./dao.js";
import { TagBody, TagFilters } from "./schema.js";

export const GetAllTagsServices = async (filters: TagFilters) => {
    const data = await DAO.GetAllTagsDAO(filters);
    return data;
}

export const GetTagByCodeServices = async (code: CheckCodeTypes) => {
    const data = await DAO.GetTagByCodeDAO(code);
    return data;
}

export const CreateTagServices = async (data: TagBody) => {
    await DAO.CraeteTagDAO(data);
    return ({ message: "Tag successful created." });
}

export const UpdateTagServices = async (code: CheckCodeTypes, data: TagBody) => {
    await DAO.UpdateTagDAO(code, data);
    return ({ message: "Tag successful updated." });
}

export const DeletTagServices = async (code: CheckCodeTypes) => {
    await DAO.DeleteTagDAO(code);
    return ({ message: "Tag successful deleted." });
}