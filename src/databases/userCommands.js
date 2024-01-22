const { connectDatabase} = require('./db');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.URL_PREFIX
async function nicknameGenerator(name){
    const randomNumber = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
    //Falta concatenar la URL base my.tagnet.net
    const generatedNickname = `${name}${randomNumber}`;

    const link = `${url}/${generatedNickname}`;

    const { client, db } = await connectDatabase();
    return {generatedNickname, link};
}

module.exports = {nicknameGenerator};