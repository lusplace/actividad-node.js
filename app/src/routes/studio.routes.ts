import express, { Router } from "express";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { AuthMiddleware } from "../middlewares/requireAuth";
import * as studioSchema from "../schemas/studio.schema";
import { StudioController } from "../controllers/studio.controller";

export function createStudioRouter(studioController : StudioController, authMiddleware : AuthMiddleware): Router{
    const studioRouter = express.Router();
    const auth = authMiddleware;

    //GET /api/studios — Obtener todos los estudios (público)
    studioRouter.get("/", (req, res, next) => studioController.get(req, res, next));

    //GET /api/studios/:id — Obtener un estudio por su ID (público)
    studioRouter.get("/:id", (req, res, next) => studioController.getById(req, res, next));

    //POST /api/studios — Crear un nuevo estudio (requiere autenticación)
    studioRouter.post("/", validate(studioSchema.postSchema), auth.requireAuth, (req, res, next) => studioController.create(req, res, next));

    //PUT /api/studios/:id — Actualizar un estudio (requiere autenticación)
    studioRouter.put("/:id", validate(studioSchema.putSchema), auth.requireAuth, (req, res, next) => studioController.update(req, res, next));

    //DELETE /api/studios/:id — Eliminar un estudio (requiere autenticación)
    studioRouter.delete("/:id", auth.requireAuth, (req, res, next) => studioController.delete(req, res, next));

    //GET /api/studios/:id/games — Obtener todos los videojuegos de un estudio (JOIN, público)
    studioRouter.get("/:id/games", (req, res, next) => studioController.getGames(req, res, next));

    return studioRouter;
}
