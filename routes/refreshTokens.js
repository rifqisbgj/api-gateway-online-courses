const express = require('express');
const router = express.Router();

const tokensHandler = require('./handler/refresh-tokens');

router.post('/', tokensHandler.refreshToken);

module.exports = router;
