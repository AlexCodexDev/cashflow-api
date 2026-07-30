import { Request, Response } from "express";
import * as Services from "./services.js";
import { TagBody, TagFilters } from "./schema.js";
import { CheckCodeTypes } from "../../types/types.js";

export const GetAllTagsController = async (req: Request<{}, {}, {}, TagFilters>, res: Response) => {
    try {
        const result = await Services.GetAllTagsServices(req.query);
        
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.messsage);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const GetTagByCodeController = async (req: Request<CheckCodeTypes>, res: Response) => {
    try {
        const result = await Services.GetTagByCodeServices(req.params);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.messsage);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const CreateTagController = async (req: Request<{}, {}, TagBody>, res: Response) => {
    try {
        const result = await Services.CreateTagServices(req.body);
        return res.status(201).json(result);
    } catch (error: any) {
        console.log(error.messsage);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const UpdateTagController = async (req: Request<CheckCodeTypes, {}, TagBody>, res: Response) => {
    try {
        const result = await Services.UpdateTagServices(req.params, req.body);
        return res.status(201).json(result);
    } catch (error: any) {
        console.log(error.messsage);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const DeleteTagController = async (req: Request<CheckCodeTypes>, res: Response) => {
    try {
        const result = await Services.DeletTagServices(req.params);
        return res.status(201).json(result);
    } catch (error: any) {
        console.log(error.messsage);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}