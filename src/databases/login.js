const { connectDatabase, closeDatabase } = require('./db');
const jwt = require('jsonwebtoken');



async function login(email, password) {
    const email = req.body.email;
    const password = req.body.password;
    
    const { client, db } = await connectDatabase();
    
    try {
        const usuarios = db.collection('data_users');
        const result = await usuarios.findOne({ email: email });
        if (!result) {
            return res.status(400).send("El correo electrónico no existe");
        }
        const isPasswordCorrect = await bcrypt.compare(password, result.password);
        if (!isPasswordCorrect) {
            return res.status(400).send("La contraseña no es correcta");
        }
        req.userId = result._id;
        next();
        
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error en la validación de correo electrónico");
    } finally {
        await closeDatabase(client);
    }

    const generarTokenSesion = (usuario) => {
        const token = jwt.sign(usuario, 'secreto', { expiresIn: '15m' }); // Token de sesión con vida útil de 15 minutos
        const tokenActualizacion = jwt.sign(usuario, 'secreto_actualizacion', { expiresIn: '7d' }); // Token de actualización con vida útil de 7 días
        return { token, tokenActualizacion };
    };
}


