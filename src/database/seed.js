import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = "mi_base_de_datos";

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

        // Insertar empresas falsas
        let empresas = [];
        for (let i = 0; i < 10; i++) {
            empresas.push({
                CUIT: faker.string.numeric(11),
                RazonSocial: faker.company.name(),
                FechaAdhesion: faker.date.past(),
            });
        }
        await empresasCollection.insertMany(empresas);

        // Insertar transferencias falsas
        let transferencias = [];
        for (let i = 0; i < 20; i++) {
            transferencias.push({
                Importe: faker.finance.amount(),
                IdEmpresa: empresas[Math.floor(Math.random() * empresas.length)].CUIT,
                CuentaDebito: faker.finance.account(),
                CuentaCredito: faker.finance.account(),
            });
        }
        await transferenciasCollection.insertMany(transferencias);

        console.log("✅ Base de datos poblada con datos falsos.");
    } catch (error) {
        console.error("❌ Error populando la base de datos:", error);
    } finally {
        await client.close();
    }
}

// Ejecutar la función si el script se llama directamente
if (require.main === module) {
    seedDatabase();
}

exports = { seedDatabase };
