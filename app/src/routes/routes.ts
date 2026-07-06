import express, { Router } from "express";
import AuthController, * as authController from "../controllers/auth.controller";
import AuthService from "../services/auth.service";
import TokenService from "../services/token.service";
import TokenServiceImpl from "../services/impl/token.service.impl";
import { createAuthRouter } from "./auth.routes";
import { GameController } from "../controllers/game.controller";
import GameService from "../services/gameService";
import StudioService from "../services/studioService";
import { StudioController } from "../controllers/studio.controller";
import { createGameRouter } from "./game.routes";
import { AuthMiddleware } from "../middlewares/requireAuth";
import { createStudioRouter } from "./studio.routes";

export default function createRouter(jwtSecret: string, jwtExpiration: number): Router{
    const router = express.Router();

    const tokenService : TokenService = new TokenServiceImpl(jwtSecret, jwtExpiration);
    const authService = new AuthService(tokenService);
    const authController = new AuthController(authService);
    const authRouter = createAuthRouter(authController);

    const authMiddleware = new AuthMiddleware(tokenService);

    const gameService = new GameService();
    const gameController = new GameController(gameService);
    const gameRouter = createGameRouter(gameController, authMiddleware);

    const studioService = new StudioService(gameService);
    const studioController = new StudioController(studioService);
    const studioRouter = createStudioRouter(studioController, authMiddleware);

    router.use("/auth", authRouter);
    router.use("/studios", studioRouter);
    router.use("/games", gameRouter);

    router.get("/", (req, res) => {
        res.status(200).send({ message: "Welcome to the api v1" });
    });

    return router;
}

