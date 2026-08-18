import { checkCode } from "../../lib/checkCode.js";
import { CheckCodeTypes, CheckFinanceBookCodeTypes } from "../../types/types.js";
import * as DAO from "./dao.js";
import { WalletBody, WalletFilter } from "./schema.js";

export const GetAllWalletServices = async (filters: WalletFilter) => {
    const data = await DAO.GetAllWalletDAO(filters);
    return data;
}

export const GetWalletByCodeServices = async (code: CheckCodeTypes) => {
    const data = await DAO.GetWalletByCodeDAO(code);
    return data;
}

export const GetWalletByFinanceBookCodeServices = async (code: CheckFinanceBookCodeTypes) => {
    const data = await DAO.GetWalletByFinanceBookCodeDAO(code);
    return data;
}

export const CreateWalletServices = async (data: WalletBody) => {
    await DAO.CreateWalletDAO(data);
    return ({ message: "Wallet successful created." });
}

export const UpdateWalletServices = async (code: CheckCodeTypes, data: WalletBody) => {
    await DAO.UpdateWalletDAO(code, data);
    return ({ message: "Wallet successful updated." });
}

export const DeleteWalletServices = async (code: CheckCodeTypes) => {
    await DAO.DeleteWalletDAO(code);
    return ({ message: "Wallet successful deleted." });
}