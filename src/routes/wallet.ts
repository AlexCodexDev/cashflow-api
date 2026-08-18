import { Router } from "express";
import * as Controller from "../domain/wallet/controller.js";
import { Validation } from "../middleware/validation.js";
import { CheckCodeSchema, CheckFinanceBookCodeSchema } from "../types/types.js";
import { WalletFilterSchema, WalletSchema } from "../domain/wallet/schema.js";

const routerWallet: Router = Router();

routerWallet.get("/fetch", Validation(WalletFilterSchema, "query"), Controller.GetAllWalletController);
routerWallet.get("/fetch-by-code/:code", Validation(CheckCodeSchema, "params"), Controller.GetWalletByCodeController);
routerWallet.get('/fetch-by-book-code/:financeBookCode', Validation(CheckFinanceBookCodeSchema, "params"), Controller.GetWalletByFinanceBookCodeController);

routerWallet.post("/create", Validation(WalletSchema, "body"), Controller.CreateWalletController);

routerWallet.put("/update/:code", Validation(CheckCodeSchema, "params"), Validation(WalletSchema, "body"), Controller.UpdateWalletController);
routerWallet.put("/delete/:code", Validation(CheckCodeSchema, "params"), Controller.DeleteWalletController);

export default routerWallet;