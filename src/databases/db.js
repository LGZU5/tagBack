const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI || 'mongodb://192.168.1.15:27017';
const dbName = process.env.DB_NAME || 'db';

async function connectDatabase() {
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    return { client, db };
}

async function closeDatabase(client) {
    await client.close();
}

module.exports = { connectDatabase, closeDatabase };

