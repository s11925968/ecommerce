import { Router } from "express";
import * as controllers from "./auth.controller.js"
import { asyncHandler } from "../../utls/errorHandling.js";
const router=Router();
router.post('/register',asyncHandler(controllers.register));
router.post('/login',asyncHandler(controllers.login));

export default router;

