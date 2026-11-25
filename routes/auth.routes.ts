import { Router } from "express";
import {
  register,
  login,
  changePassword,
  changeUsername,
} from "../controllers/auth.controller.ts";

import { validateJWT } from "../middlewares/validateJWT.ts";



const router = Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/change-password", [validateJWT], changePassword);
router.patch("/change-username", [validateJWT], changeUsername);
export { router as authRouter }; 