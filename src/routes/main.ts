import { Router } from "express";
import routerCategory from "./category.js";
import routerTag from "./tag.js";
import routerPayment from "./payment.js";
import routerWallet from "./wallet.js";
import routerFinanceBook from "./financeBook.js";

const router: Router = Router();

router.use("/category", routerCategory);
router.use("/tag", routerTag);
router.use("/payment", routerPayment);
router.use("/wallet", routerWallet);
router.use("/finance-book", routerFinanceBook);

export default router;