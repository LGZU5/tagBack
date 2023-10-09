const express = require('express');
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


const app = express();
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

app.listen(8080, () => {
    console.log("Server running on port 8080");
});