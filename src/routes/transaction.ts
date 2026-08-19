import { Router } from "express";
import * as Controller from "../domain/transaction/controller.js";
import { Validation } from "../middleware/validation.js";
import * as Schema from "../domain/transaction/schema.js";

const routerTransaction: Router = Router();

routerTransaction.get("/fetch", Controller.GetAllTransactionController);
routerTransaction.get("/fetch-by-code/:code", Validation(Schema.TransactionParamSchema, "params"), Controller.GetTransactionByCodeController);

routerTransaction.post("/create", Validation(Schema.TransactionSchema, "body"), Controller.CreateTransactionController);

export default routerTransaction;