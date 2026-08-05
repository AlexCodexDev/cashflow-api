import { Request, Response } from "express";
import * as Services from "./services.js";

export const GetAllFinanceBookController = async (req: Request, res: Response) => {
    try {
        const result = await Services.GetAllFinanceBookServices();
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}