import { Router } from "express";
import * as Controller from "../domain/tag/controller.js";
import { Validation } from "../middleware/validation.js";
import { CheckCodeSchema } from "../types/types.js";
import { TagFilterSchema, TagSchema } from "../domain/tag/schema.js";

const routerTag: Router = Router();

routerTag.get("/fetch", Validation(TagFilterSchema, "query"), Controller.GetAllTagsController);
routerTag.get("/fetch/:code", Validation(CheckCodeSchema, "params"), Controller.GetTagByCodeController);

routerTag.post("/create", Validation(TagSchema, "body"), Controller.CreateTagController);

routerTag.put("/update/:code", Validation(CheckCodeSchema, "params"), Validation(TagSchema, "body"), Controller.UpdateTagController);
routerTag.put("/delete/:code", Validation(CheckCodeSchema, "params"), Controller.DeleteTagController);

export default routerTag;