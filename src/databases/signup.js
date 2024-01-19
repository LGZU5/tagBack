const { connectDatabase, closeDatabase } = require('./db');

async function signUp(name, email, cryptPass, link) {
    const { client, db } = await connectDatabase();

    try {
        const usuarios = db.collection('data_users');

        // Inserta el nuevo usuario
        const result = await usuarios.insertOne({
            nameCount: name,
            email: email,
            password: cryptPass,
            password: cryptPass,
            premium: "false",
            perfil1:{
                name: "",
                telefono: "",
                foto: "",
                links: [link],
                apps: [[]]
            }
        });
        const userId = result.insertedId;

        return userId; // Devuelve el ID del usuario insertado
    } catch (error) {
        throw error;
    } finally {
        await closeDatabase(client);
    }
}

async function checkEmailExists(email) {

    const { client, db } = await connectDatabase();

    try {
        const usuarios = db.collection('data_users');
        const result = await usuarios.findOne({ email: email });
        // Si result no es nulo, significa que el correo electrónico ya existe.
        return result !== null;
    } catch (error) {
        // Manejar errores de la base de datos, por ejemplo, loggear el error.
        console.error("Error al verificar el correo electrónico en la base de datos:", error);
        throw error; // Puedes lanzar el error para que sea manejado por la llamada a esta función.
    } finally {
        await closeDatabase(client);
    }
}

module.exports = { signUp, checkEmailExists };
