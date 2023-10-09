const express = require('express');
const router = express.Router();
const db = require('../databases/db');

router.get('/:nickname', async (req, res) => {
    const nickname = req.params.nickname;

    try {
        // Wait for the promise to resolve
        const userData = await db.getNickData(nickname);

        if (Array.isArray(userData) && userData.length > 0) {
            const id_user = userData[0].id;

            console.log(id_user)

            const linksUser = await db.getLinksWithColumnNames(id_user);

            console.log(linksUser)

            // Render the user page with the corresponding data
            res.render('plantilla', { userData, linksUser });
        } else {
            // Render a custom "not found" template instead of redirecting to an error page
            res.status(400);
        }
    } catch (error) {
        // Handle errors if the promise is rejected
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;