import "dotenv/config";
import http from "http";
import { connectDB } from "./config/db.js";
import empresaRoutes from "./routes/empresaRoutes.js";


let db;

async function startServer() {
    db = await connectDB();

    const server = http.createServer((req, res) => {
        empresaRoutes(req, res, db);
    });

    server.listen(process.env.PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
}

startServer();
