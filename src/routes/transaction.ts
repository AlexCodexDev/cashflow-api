import { Router } from "express";
import * as Controller from "../domain/transaction/controller.js";
import { Validation } from "../middleware/validation.js";
import * as Schema from "../domain/transaction/schema.js";
import { CheckCodeSchema } from "../types/types.js";

const routerTransaction: Router = Router();

routerTransaction.get("/fetch", Controller.GetAllTransactionController);
routerTransaction.get("/fetch-by-code/:code", Validation(CheckCodeSchema, "params"), Controller.GetTransactionByCodeController);

routerTransaction.post("/create", Validation(Schema.TransactionSchema, "body"), Controller.CreateTransactionController);

routerTransaction.put("/update/:code", Validation(CheckCodeSchema, "params"), Validation(Schema.TransactionSchema, "body"), Controller.UpdateTransactionController);
routerTransaction.put("/delete/:code", Validation(CheckCodeSchema, "params"), Controller.DeleteTransactionController);

export default routerTransaction;