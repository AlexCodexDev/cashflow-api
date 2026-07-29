import { Request, Response } from "express";
import * as Services from "./services.js";
import { TagBody, TagFilters, TagParams } from "./schema.js";

export const GetAllTagsController = async (req: Request<{}, {}, {}, TagFilters>, res: Response) => {
    const filters = req.query;

    try {
        const result = await Services.GetAllTagsServices(filters);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong : " + error.message });
    }
}

export const GetTagByCodeController = async (req: Request<TagParams>, res: Response) => {
    const code = req.params;
    
    try {
        const result = await Services.GetTagByCodeServices(code);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong : " + error.message });
    }
}

export const CreateTagController = async (req: Request<{}, {}, TagBody>, res: Response) => {
    const data = req.body;

    try {
        const result = await Services.CreateTagServices(data);
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong : " + error.message });
    }
}

export const UpdateTagController = async (req: Request<TagParams, {}, TagBody>, res: Response) => {
    const code = req.params;
    const data = req.body;
    
    try {
        const result = await Services.UpdateTagServices(code, data);
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong : " + error.message });
    }
}

export const DeleteTagController = async (req: Request<TagParams>, res: Response) => {
    const code = req.params;
    
    try {
        const result = await Services.DeletTagServices(code);
        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong : " + error.message });
    }
}