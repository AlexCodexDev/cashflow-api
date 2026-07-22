import { Router } from "express";
import CategoryValidation from "../domain/category/middleware.js";
import * as Controller from "../domain/category/controller.js";
import * as Schema from "../domain/category/schema.js";

const routerCategory: Router = Router();

routerCategory.get('/fetch', Controller.GetAllCategoryController);
routerCategory.get('/fetch/:code', Controller.GetCategoryByCode);
routerCategory.post("/create", CategoryValidation(Schema.CategoryParamSchema), Controller.CreateCatgoryController);

export default routerCategory;