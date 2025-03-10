import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
    await client.connect();
    console.log("MongoDB conectado");
    return client.db(process.env.DB_NAME);
}

export { connectDB };
