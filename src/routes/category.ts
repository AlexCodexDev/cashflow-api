import { Router } from "express";
import * as Controller from "../domain/category/controller.js";
import { CheckCodeSchema } from "../types/types.js";
import { Validation } from "../middleware/validation.js";
import { CategoryFilterSchema, CategorySchema } from "../domain/category/schema.js";

const routerCategory: Router = Router();

routerCategory.get('/fetch', Validation(CategoryFilterSchema, "query"), Controller.GetAllCategoryController);
routerCategory.get('/fetch/:code', Validation(CheckCodeSchema, "params"), Controller.GetCategoryByCodeController);
routerCategory.post('/create', Validation(CategorySchema, "body"), Controller.CreateCatgoryController);
routerCategory.put('/update/:code', Validation(CheckCodeSchema, "params"), Validation(CategorySchema, "body"), Controller.UpdateCategoryController);
routerCategory.put('/delete/:code', Validation(CheckCodeSchema, "params"), Controller.DeleteCategoryController);

export default routerCategory;