const express = require('express');
const homeRouter = require('./home');
const mainRouter = require('./main');
const router = express.Router();

// URL Versioning
router.use('/', homeRouter);
router.use('/main', mainRouter);

module.exports = router;
