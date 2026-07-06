import dotenv from "dotenv";
dotenv.config();
import http from "node:http";
import app from "./app";
const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : 1234;

// Iniciar el servidor
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});