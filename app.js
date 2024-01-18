const express = require('express');
const cors = require('cors');
const indexRoute = require('./src/routes/index.routes');
const signupRoute = require('./src/routes/signup.routes');

const secret = 'abcdefghijk';
const app = express();

app.use(express.urlencoded({ extended: true }));
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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
