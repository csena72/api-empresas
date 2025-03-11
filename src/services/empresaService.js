import { ObjectId } from "mongodb";

async function getTransferenciasRecientes(db) {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const timestamp = Math.floor(lastMonth.getTime() / 1000);
    // Se arma un ObjectId mínimo a partir del timestamp
    const objectIdThreshold = new ObjectId(timestamp.toString(16) + "0000000000000000");

    return await db.collection("transferencias")
        .aggregate([
            // Trae solo las transferencias cuyo _id fue creado en el último mes
            { $match: { _id: { $gte: objectIdThreshold } } },
            { $lookup: {
                from: "empresas",
                localField: "IdEmpresa",
                foreignField: "CUIT",         // Se relaciona por el campo CUIT
                as: "empresa"
            }},
            { $unwind: "$empresa" },
            
            { $project: {
                _id: 0,
                Importe: 1,
                IdEmpresa: 1,
                CuentaDebito: 1,
                CuentaCredito: 1,
                "empresa.CUIT": 1,
                "empresa.RazonSocial": 1
            }}
        ])
        .toArray();
}

async function getEmpresasAdhesion(db) {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return await db.collection("empresas").find({ FechaAdhesion: { $gte: lastMonth } }).toArray();
}

async function addEmpresa(db, empresaData) {
    empresaData.FechaAdhesion = new Date();
    await db.collection("empresas").insertOne(empresaData);
    return { message: "Empresa adherida" };
}

export { getTransferenciasRecientes, getEmpresasAdhesion, addEmpresa };
