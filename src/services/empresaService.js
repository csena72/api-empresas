import { ObjectId } from "mongodb";

async function getTransferenciasRecientes(db) {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return await db.collection("transferencias")
        .aggregate([
            { $match: { fecha: { $gte: lastMonth } } }, // Filtra transferencias del último mes
            { 
                $lookup: { 
                    from: "empresas",
                    localField: "id_empresa",
                    foreignField: "_id",
                    as: "empresa"
                } 
            },
            { $unwind: "$empresa" }, // Desanida la empresa
            { 
                $group: { 
                    _id: "$empresa._id", // Agrupa por empresa
                    CUIT: { $first: "$empresa.CUIT" },
                    RazonSocial: { $first: "$empresa.RazonSocial" },
                    transferencias: { 
                        $push: { 
                            fecha: "$fecha",
                            monto: "$monto"
                        }
                    }
                }
            }
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
