import express, { Router } from "express";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import AuthController from "../controllers/auth.controller";

export function createAuthRouter(authController : AuthController): Router{

    const authRouter = express.Router();
    authRouter.post("/register", validate(registerSchema), (req, res, next) => authController.register(req, res, next));
    authRouter.post("/login", validate(loginSchema), (req, res, next) => authController.login(req, res, next));
    return authRouter;
}
