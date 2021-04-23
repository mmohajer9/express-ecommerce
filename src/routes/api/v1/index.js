const express = require('express');
const homeRouter = require('./home');
const authRouter = require('./auth');
const userRouter = require('./user');

const router = express.Router();

// URL Versioning
router.use('/', homeRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
