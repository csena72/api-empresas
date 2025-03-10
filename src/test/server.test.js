import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import http from "http";
import empresaRoutes from "../routes/empresaRoutes.js";

let mongod, db, server;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db("testdb");

    server = http.createServer((req, res) => empresaRoutes(req, res, db));
});

afterAll(async () => {
    await mongod.stop();
});

test("Debe adherir una empresa", async () => {
    const postData = JSON.stringify({ CUIT: "12345678901", RazonSocial: "Empresa Test" });

    const options = {
        hostname: "localhost",
        port: 3000,
        path: "/empresas/adhesion",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData)
        }
    };

    await new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => { data += chunk; });
            res.on("end", () => {
                const response = JSON.parse(data);
                expect(res.statusCode).toBe(201);
                expect(response.message).toBe("Empresa adherida");
                resolve();
            });
        });

        req.on("error", reject);
        req.write(postData);
        req.end();
    });
});
