const express = require('express');
const apiV1 = require('./api.v1');

const router = express.Router();

// URL Versioning
router.use('/v1', apiV1);

module.exports = router;
