import { Router } from "express";
import routerCategory from "./category.js";
import routerTag from "./tag.js";

const router: Router = Router();

router.use("/category", routerCategory);
router.use("/tag", routerTag);

export default router;