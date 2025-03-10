
import * as empresaController from "../controllers/empresaController.js";

function empresaRoutes(req, res, db) {
    if (req.url === "/empresas/transferencias" && req.method === "GET") {
        return empresaController.obtenerEmpresasTransferencias(req, res, db);
    }
    
    if (req.url === "/empresas/adhesion" && req.method === "GET") {
        return empresaController.obtenerEmpresasAdhesion(req, res, db);
    }

    if (req.url === "/empresas/adhesion" && req.method === "POST") {
        return empresaController.adherirEmpresa(req, res, db);
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
}

export default empresaRoutes;
