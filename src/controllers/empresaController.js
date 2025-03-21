import * as empresaService from "../services/empresaService.js";

async function obtenerTransferenciasRecientes(req, res, db) {
    try {
        const empresas = await empresaService.getTransferenciasRecientes(db);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(empresas));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Error al obtener empresas" }));
    }
}

async function obtenerEmpresasAdhesion(req, res, db) {
    try {
        const empresas = await empresaService.getEmpresasAdhesion(db);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(empresas));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Error al obtener empresas" }));
    }
}

async function adherirEmpresa(req, res, db) {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", async () => {
        try {
            const empresaData = JSON.parse(body);
            const response = await empresaService.addEmpresa(db, empresaData);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error al adherir empresa" }));
        }
    });
}

export { obtenerTransferenciasRecientes, obtenerEmpresasAdhesion, adherirEmpresa };
