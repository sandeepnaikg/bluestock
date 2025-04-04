import express from "express"
import { changepasswordValidator, passwordValidator, validateChangePassword, validateLogin } from "../../middleware/ValidatorMddleware.js";
import { validateSignup } from "../../middleware/ValidatorMddleware.js";
import { changePassword, forgetpassword, login, logout, resetpassword, signup, verifyOTP } from "../../controller/Authcontroller.js";
import AuthMiddleware from "../../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/signup",validateSignup,passwordValidator,signup);
router.post("/login",validateLogin,passwordValidator,login);
router.post("/logout",logout);
router.post("/change-password",AuthMiddleware,validateChangePassword,changepasswordValidator,changePassword);
router.post("/forget-password",forgetpassword);
router.post("/verify-otp",verifyOTP);
router.post("/reset-password",passwordValidator,resetpassword);
export default router;
