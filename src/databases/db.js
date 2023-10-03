const mysql = require('mysql2')
const dotenv = require('dotenv') // Importa la librería dotenv
dotenv.config(); // Carga las variables de entorno desde el archivo .env

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();


const signUp = async (email, cryptPass) => {
    try {
        const connection = await pool.getConnection();

        // Check if email already exists
        const emailExistsQuery = 'SELECT COUNT(*) as count FROM data_users WHERE email = ?';
        const [emailCount] = await connection.query(emailExistsQuery, [email]);
        if (emailCount[0].count > 0) {
            throw new Error('El correo electrónico ya está registrado');
        }

        const query = 'INSERT INTO data_users (email, password) VALUES (?, ?)';
        const values = [email, cryptPass];
        const [result] = await connection.query(query, values);

        const userId = result.insertId;
        console.log(userId)

        const insertQuery = 'INSERT INTO links_usuarios (id_user) VALUES (?)';
        const insertValues = [userId]; // Puedes proporcionar otros valores para las columnas de 'otra_tabla'
        const [insertResult] = await connection.query(insertQuery, insertValues);

        if (insertResult.affectedRows === 1) {
            console.log('exito al ingresar el dato')
        } else {
            console.log('f')
        }

        var emailToSend = `Mailto:${email}`

        const insertQuery2 = 'UPDATE links_usuarios SET Email = ? WHERE id_user = ?';
        const insertValues2 = [emailToSend, userId];
        const [insertResult2] = await connection.query(insertQuery2, insertValues2);
        if (insertResult2.affectedRows === 1) {
            console.log('exito al ingresar el dato')
        } else {
            console.log('f')
        }

        connection.release();
        return result;
    } catch (error) {
        throw error; // Asegúrate de lanzar la excepción original
    }
};

const createName = async (insertId, name) => {
    try {
        const connection = await pool.getConnection();
        const query = 'UPDATE data_users SET name = ? WHERE id = ?';
        const values = [name, insertId];
        const [result] = await connection.query(query, values);
        connection.release();
        return result;
    } catch (error) {
        throw error;
    }
};

const updateName = async (editName, idUser) => {
    try {
        const connection = await pool.getConnection();
        const query = 'UPDATE data_users SET name = ? WHERE id = ?';
        const values = [editName, idUser];
        const [result] = await connection.query(query, values);
        connection.release();

        if (result.affectedRows > 0) {
            // Update was successful
            return { success: true };
        } else {
            // No rows were affected, possibly because the user ID doesn't exist
            return { success: false, message: 'User not found or no changes made' };
        }
    } catch (error) {
        throw error; // Let the error propagate up to handle it in the route handler
    }
};

const updatePhoneNumber = async (insertId, fullPhoneNumber, fullWhatsapp) => {
    try {
        const connection = await pool.getConnection();
        const query = 'UPDATE links_usuarios SET Telefono = ? WHERE id_user = ?';
        const values = [fullPhoneNumber, insertId];
        const [result] = await connection.query(query, values);

        const queryWhatsapp = 'UPDATE links_usuarios SET Whatsapp = ? WHERE id_user = ?';
        const valuesWhatsapp = [fullWhatsapp, insertId];
        const [resultWhatsapp] = await connection.query(queryWhatsapp, valuesWhatsapp);

        if (resultWhatsapp.affectedRows === 1) {
            console.log('exito al ingresar el wasa')
        } else {
            console.log('f')
        }
        connection.release();
        return result;
    } catch (error) {
        throw error;
    }
};

const getUserName = async (insertId) => {
    try {
        const connection = await pool.getConnection();
        const query = 'SELECT name FROM data_users WHERE id = ?';
        const [result] = await connection.query(query, [insertId]);
        connection.release();

        return result.length > 0 ? result[0].name : null;
    } catch (error) {
        throw error;
    }
};

const insertImageURL = async (userId, fileLocationWithoutPublic) => {
    try {
        const connection = await pool.getConnection();
        const query = 'UPDATE data_users SET profile_image_url = ? WHERE id = ?';
        const values = [fileLocationWithoutPublic, userId];
        const [result] = await connection.query(query, values);
        connection.release();
        return result;
    } catch (error) {
        throw error;
    }
}

const Login = async (email) => {
    try {
        const connection = await pool.getConnection();
        const userQuery = 'SELECT * FROM data_users WHERE email = ?';
        const [userRows] = await connection.query(userQuery, [email]);
        await connection.release();

        if (userRows.length === 0) {
            return null; // Usuario no encontrado
        }
        const user = userRows[0];
        return user;
    } catch (error) {
        throw error; // Asegúrate de lanzar la excepción original
    }
}

const getUserData = async (email) => {
    try {
        const connection = await pool.getConnection();
        const query = 'SELECT * FROM data_users WHERE email = ?';
        const [result] = await connection.query(query, [email]);
        connection.release();

        return result;
    } catch (error) {
        throw error;
    }
};

const getProfilePhoto = async (email) => {
    try {
        const connection = await pool.getConnection();
        const query = 'SELECT * FROM data_users WHERE email = ?';
        const [result] = await connection.query(query, [email]);
        connection.release();

        return result;
    } catch (error) {
        throw error;
    }
};

const editImageBanner = async (email, fileLocationWithoutPublic) => {
    try {
        const connection = await pool.getConnection();
        const query = 'UPDATE data_users SET banner_image = ? WHERE email = ?';
        const values = [fileLocationWithoutPublic, email];
        const [result] = await connection.query(query, values);
        connection.release();
        return result;
    } catch (error) {
        throw error;
    }
}

const addLinks = async (selectedTextValue, userInput, storedIdNumber) => {
    try {
        const connection = await pool.getConnection();
        console.log(`${selectedTextValue} ${userInput} ${storedIdNumber}`)
        const query = `UPDATE links_usuarios SET ${selectedTextValue} = ? WHERE id_user = ?`;
        const values = [userInput, storedIdNumber];
        const [result] = await connection.query(query, values);
        console.log('Valores de los parámetros:', selectedTextValue, userInput, storedIdNumber);
        console.log('Consulta SQL:', query, values);
        connection.release();
        console.log('Inserción exitosa en la base de datos:', result);
        return result;
    } catch (error) {
        console.error("Error en addLinks:", error);
        throw error;
    }
}

const getLinksWithColumnNames = async (userId) => {
    try {
        const connection = await pool.getConnection();
        const query = 'SELECT * FROM links_usuarios WHERE id_user = ?';
        const [result] = await connection.query(query, [userId]);
        connection.release();

        if (result.length > 0) {
            const userData = result[0];
            const userDataWithColumns = {}; // Objeto para almacenar los datos con nombres de columna

            // Itera a través de las columnas y sus valores
            for (const column in userData) {
                if (column !== 'id' && column !== 'id_user' && userData[column] !== null) {
                    userDataWithColumns[column] = userData[column];
                }
            }

            return userDataWithColumns; // Devuelve los datos con nombres de columna sin valores nulos
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        throw error;
    }
}



const updateParraf = async (editParraf, idUser) => {
    try {
        const connection = await pool.getConnection();
        const query = 'UPDATE data_users SET description = ? WHERE id = ?';
        const values = [editParraf, idUser];
        const [result] = await connection.query(query, values);
        connection.release();

        if (result.affectedRows > 0) {
            // Update was successful
            console.log('ok')
            return { success: true };
        } else {
            // No rows were affected, possibly because the user ID doesn't exist
            return { success: false, message: 'User not found or no changes made' };
        }
    } catch (error) {
        console.error('Error al actualizar la descripción:', error);
        throw { success: false, message: 'Error updating description' };
    }

};

const deleteImages = async (imagePath, imageType) => {
    try {
        const connection = await pool.getConnection();

        let query;
        let values;

        if (imageType === 'profile_image_url') {
            // Si el tipo de imagen es 'profile_image_url', actualiza la columna 'profile_image'
            query = 'UPDATE data_users SET profile_image_url = NULL WHERE profile_image_url = ?';
            values = [imagePath];
        } else if (imageType === 'banner_image') {
            // Si el tipo de imagen es 'banner_image', actualiza la columna 'banner_image'
            query = 'UPDATE data_users SET banner_image = NULL WHERE banner_image = ?';
            values = [imagePath];
        } else {
            // Tipo de imagen no reconocido, maneja el error como desees
            throw new Error('Tipo de imagen no reconocido');
        }

        const [result] = await connection.query(query, values);
        connection.release();

        if (result.affectedRows > 0) {
            // La actualización fue exitosa, lo que significa que la referencia a la foto se eliminó
            return { success: true };
        } else {
            // No se encontró la foto en la base de datos
            return { success: false, message: 'Imagen no encontrada en la base de datos' };
        }
    } catch (error) {
        throw error;
    }
};

const editLinks = async (storedIdNumber, editLink, selectedTextValue) => {
    try {
        const connection = await pool.getConnection();
        const query = `UPDATE links_usuarios SET ${selectedTextValue}= ? WHERE id_user = ?`;
        const values = [editLink, storedIdNumber];
        const [result] = await connection.query(query, values);
        return result;
    } catch (error) {
        console.error("Error en editLinks:", error);
        throw error;
    }
}


const editTesteo = async (email, fileLocationWithoutPublic) => {
    try {
        const connection = await pool.getConnection();
        const query = 'UPDATE data_users SET logo = ? WHERE email = ?';
        const values = [fileLocationWithoutPublic, email];
        const [result] = await connection.query(query, values);
        connection.release();
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    signUp,
    createName,
    updatePhoneNumber,
    getUserName,
    insertImageURL,
    Login,
    getUserData,
    getProfilePhoto,
    editImageBanner,
    addLinks,
    getLinksWithColumnNames,
    updateName,
    updateParraf,
    deleteImages,
    editLinks,
    editTesteo
};
