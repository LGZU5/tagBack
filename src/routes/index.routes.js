const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');  // Esto renderizará 'views/index.ejs'
});

module.exports = router