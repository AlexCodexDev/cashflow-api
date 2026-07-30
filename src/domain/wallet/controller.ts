import { Request, Response } from "express";
import * as Services from "./services.js";
import { WalletBody } from "./schema.js";
import { CheckCodeTypes } from "../../types/types.js";

export const GetAllWalletController = async (req: Request, res: Response) => {
    try {
        const result = await Services.GetAllWalletServices(req.query);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const GetWalletByCodeController = async (req: Request<CheckCodeTypes>, res: Response) => {
    try {
        const result = await Services.GetWalletByCodeServices(req.params);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const CreateWalletController = async (req: Request<{}, {}, WalletBody>, res: Response) => {
    try {
        const result = await Services.CreateWalletServices(req.body);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const UpdateWalletController = async (req: Request<CheckCodeTypes, {}, WalletBody>, res: Response) => {
    try {
        const result = await Services.UpdateWalletServices(req.params, req.body);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}

export const DeleteWalletController = async (req: Request<CheckCodeTypes>, res: Response) => {
    try {
        const result = await Services.DeleteWalletServices(req.params);
        return res.status(200).json(result);
    } catch (error: any) {
        console.log(error.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
}