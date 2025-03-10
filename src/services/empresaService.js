
async function getEmpresasTransferencias(db) {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return await db.collection("transferencias")
        .aggregate([
            { $match: { fecha: { $gte: lastMonth } } },
            { $lookup: {
                from: "empresas",
                localField: "id_empresa",
                foreignField: "_id",
                as: "empresa"
            }},
            { $unwind: "$empresa" },
            { $project: { _id: 0, "empresa.CUIT": 1, "empresa.RazonSocial": 1 } }
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

export { getEmpresasTransferencias, getEmpresasAdhesion, addEmpresa };
