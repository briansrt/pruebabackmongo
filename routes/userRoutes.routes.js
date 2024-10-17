const express = require('express');
const router = express.Router();
const {postLogin} = require('./controllers/users.js');

router.post('/login', postLogin);

module.exports = router;