import express, { Router } from "express";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { AuthMiddleware } from "../middlewares/requireAuth";
import * as gameSchema from "../schemas/game.schema";
import { GameController } from "../controllers/game.controller";

export function createGameRouter(gameController : GameController, authMiddleware : AuthMiddleware): Router{
    const gameRouter = express.Router();
    const auth = authMiddleware;

    //GET /api/games — Obtener todos los egames (público)
    gameRouter.get("/", (req, res, next) => gameController.get(req, res, next));

    //GET /api/games/:id — Obtener un egame por su ID (público)
    gameRouter.get("/:id", (req, res, next) => gameController.getById(req, res, next));

    //POST /api/games — Crear un nuevo egame (requiere autenticación)
    gameRouter.post("/", validate(gameSchema.postSchema), auth.requireAuth, (req, res, next) => gameController.create(req, res, next));

    //PUT /api/games/:id — Actualizar un egame (requiere autenticación)
    gameRouter.put("/:id", validate(gameSchema.putSchema), auth.requireAuth, (req, res, next) => gameController.update(req, res, next));

    //DELETE /api/games/:id — Eliminar un egame (requiere autenticación)
    gameRouter.delete("/:id", auth.requireAuth, (req, res, next) => gameController.delete(req, res, next));

    return gameRouter;
}
