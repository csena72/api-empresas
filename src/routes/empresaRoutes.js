
import * as empresaController from "../controllers/empresaController.js";

function empresaRoutes(req, res, db) {

    // Trae las empresas que hicieron transferencias el último mes
    if (req.url === "/empresas/transferencias-recientes" && req.method === "GET") {
        return empresaController.obtenerEmpresasTransferencias(req, res, db);
    }
    
    // Trae las empresas que hicieron adhesion el último mes
    if (req.url === "/empresas/adhesiones-recientes" && req.method === "GET") {
        return empresaController.obtenerEmpresasAdhesion(req, res, db);
    }

    // Adherir empresa
    if (req.url === "/empresas/adhesion" && req.method === "POST") {
        return empresaController.adherirEmpresa(req, res, db);
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
}

export default empresaRoutes;
