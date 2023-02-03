import { Router } from "express";
import UserController from "./controller";
import { login, verifyOtp } from "./validator";
const router = Router();

router.post("/signup", login, UserController.signup);
router.post("/login", login, UserController.login);
router.put("/verify-otp", verifyOtp, UserController.verifyOtp);

export default router;
