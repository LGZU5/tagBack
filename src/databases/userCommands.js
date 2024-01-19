async function nicknameGenerator(name){
    const randomNumber = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
    //Falta concatenar la URL base my.tagnet.net
    const generatedNickname = `${name}${randomNumber}`;

    const { client, db } = await connectDatabase();
    return generatedNickname;
}

module.exports = nicknameGenerator;