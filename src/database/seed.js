import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";
import "dotenv/config";

const uri = process.env.MONGO_URI || "mongodb://admin:password@localhost:27017/mi_base_de_datos?authSource=admin";
const dbName = process.env.DB_NAME || "mi_base_de_datos";

async function seedDatabase() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);

        const empresasCollection = db.collection("empresas");
        const transferenciasCollection = db.collection("transferencias");

        // Limpiar colecciones antes de insertar nuevos datos
        await empresasCollection.deleteMany({});
        await transferenciasCollection.deleteMany({});

        // Inserta empresas
        let empresas = [];
        for (let i = 0; i < 10; i++) {
            empresas.push({
                CUIT: faker.string.numeric(11),
                RazonSocial: faker.company.name(),
                FechaAdhesion: faker.date.past().toISOString(),
            });
        }
        await empresasCollection.insertMany(empresas);

        // Inserta transferencias
        let transferencias = [];
        for (let i = 0; i < 20; i++) {
            transferencias.push({
                Importe: faker.finance.amount(),
                IdEmpresa: empresas[Math.floor(Math.random() * empresas.length)].CUIT,
                CuentaDebito: faker.finance.accountNumber(),
                CuentaCredito: faker.finance.accountNumber(),
            });
        }
        await transferenciasCollection.insertMany(transferencias);

        console.log("Base de datos poblada con datos falsos.");
    } catch (error) {
        console.error("Error populando la base de datos:", error);
    } finally {
        await client.close();
    }
}

// Ejecutar si el script se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    seedDatabase();
}

export { seedDatabase };
