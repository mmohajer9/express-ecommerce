const express = require('express');
const homeRouter = require('./home');
const authRouter = require('./auth');
const router = express.Router();

// URL Versioning
router.use('/', homeRouter);
router.use('/auth', authRouter);

module.exports = router;
