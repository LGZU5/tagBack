const dotenv = require('dotenv') // Importa la librería dotenv
dotenv.config(); // Carga las variables de entorno desde el archivo .env


const { MongoClient } = require('mongodb');


const bcrypt = require('bcrypt');
const mongoURI = 'mongodb://192.168.1.15:27017';
const dbName = 'db';

const signUp = async (email, cryptPass) => {
    try {
        const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);

        // Verifica si el correo electrónico ya existe
        const userCollection = db.collection('data_users');
        const emailExists = await userCollection.findOne({ email });
        if (emailExists) {
            throw new Error('El correo electrónico ya está registrado');
        }

        // Inserta el nuevo usuario
        const result = await userCollection.insertOne({ email, password: cryptPass });
        const userId = result.insertedId;

        client.close();
        return userId; // Devuelve el ID del usuario insertado
    } catch (error) {
        throw error;
    }
};


module.exports = { signUp };
