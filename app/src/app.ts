
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error";
import createRouter from "./routes/routes";
import { logger } from "./middlewares/auth";
dotenv.config();
const app: express.Application = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const jwtSecret = process.env.JWT_SECRET ;
const jwtExpiration = Number(process.env.JWT_EXPIRATION) ?? 86400;

if (jwtSecret === undefined || isNaN(jwtExpiration)){
    throw new Error('JWT_SECRET Y JWT_EXPIRATION DEBEN TENER VALORES VÁLIDOS EN EL ARCHIVO .env');
}

const router = createRouter(String(jwtSecret), jwtExpiration);

app.use("/api", router);

app.get("/*splat", (req, res) => {
    res.status(404).send({ error: "Endpoint no encontrado" });
});

app.use(errorHandler);

export default app;