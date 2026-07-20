import { Request, Response } from "express";
import * as Services from "./services.js";

export const CreateCatgoryController = async (req: Request, res: Response) => {
    try {
        const result = await Services.CreateCategoryServices(req.body);

        return res.status(201).json(result);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong."
        });
    }
}