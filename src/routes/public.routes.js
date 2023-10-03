// const express = require('express');
// const router = express.Router();
// const db = require('../databases/db');

// router.get('/:usuario', (req, res) => {
//     const usuario = req.params.usuario;

//     // Verifica si el usuario existe (aquí asumimos que hay una función obtenerDatosDelUsuario)
//     const userData = obtenerDatosDelUsuario(usuario);

//     if (userData) {
//         // Renderiza la página del usuario con los datos correspondientes
//         res.render('usuario', { usuario: userData });
//     } else {
//         // Renderiza la plantilla personalizada "noEncontrado" en lugar de redirigir a una página de error
//         res.render('noEncontrado');
//     }
// });