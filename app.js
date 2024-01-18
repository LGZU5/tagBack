const express = require('express');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const indexRoute = require('./src/routes/index.routes');
const signupRoute = require('./src/routes/signup.routes');
const loginRoute = require('./src/routes/login.routes');
const nameRoute = require('./src/routes/name.routes');
const numberRoute = require('./src/routes/number.routes');
const photosRoute = require('./src/routes/photos.routes');
const getInfo = require('./src/routes/get.routes');
const links = require('./src/routes/links.routes');
const public = require('./src/routes/public.routes');
const { getUserName } = require('./src/databases/db');

//const secret = process.env.SECRET
const secret = 'abcdefghijk';
const app = express();


/*
app.post('/token', (req,res) => {
    //GET USER FORM DB
    const {id: sub, name} = {id: "Juan", name:"Prueba"}

    // Set the token expiration to 2 weeks (14 days)
    const tokenExpiration = 14 * 24 * 60 * 60 * 1000; // 2 semanas en milisegundos

    const token = jwt.sign({
        sub,
        name,
        exp: Date.now() + tokenExpiration,
        

    }, secret)

    // Almacena la fecha de generación del token en la base de datos o en algún lugar de almacenamiento
     // Es posible que tengas que asociarlo con el usuario para recuperarlo más tarde

     const tokenGenerationDate = Date.now();// Almacena este valor en tu base de datos


    res.send({token, tokenGenerationDate});
});



app.get('/public', (req,res) => {
    res.send("I'm public");
});

app.get('/private', (req,res) => {
    try {
        // Authorization: Bearer <token>
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, secret)

        if (Date.now() > payload.exp) {
            return res.status(401).send({error: "Token expired"})
        }
        res.send("I'm private")
    } catch (error) {
        res.status(401).send({error: error.message})
    }
});


app.post('/api/login', (req,res) => {
    const user = {
        //  El usuario hace login
        id: 1,
        nombre : "Juan",
        email: "juan@email.com"
    }
    //Se crea token del usuario
    jwt.sign({user}, "secretkey", (err, token) => {
        res.json({
            token
        });
    });
});

app.post('/token/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is required' });
    }

    try {
        const payload = jwt.verify(refreshToken, refreshSecret);
        const userId = payload.userId; // Obtener el ID de usuario del token de actualización

        // Verificar si el token de actualización está en la base de datos y es válido para el usuario
        if (isValidRefreshToken(userId, refreshToken)) {
            const newAccessToken = jwt.sign({ userId }, accessSecret, { expiresIn: '1m' });
            res.json({ accessToken: newAccessToken });
        } else {
            res.status(403).json({ message: 'Invalid refresh token' });
        }
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
});
*/


app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
const corsOptions = {
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true
}
app.use(cors(corsOptions))

app.use(indexRoute);
app.use(signupRoute);
app.use(loginRoute);
app.use(nameRoute);
app.use(numberRoute);
app.use(photosRoute);
app.use(getInfo);
app.use(links);
app.use(public);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});