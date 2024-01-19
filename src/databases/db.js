const dotenv = require('dotenv');
dotenv.config();    
const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

async function connectDatabase() {
    const client = new MongoClient(mongoURI);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        return { client, db };
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
}

async function closeDatabase(client) {
    await client.close();
}

module.exports = { connectDatabase, closeDatabase };
