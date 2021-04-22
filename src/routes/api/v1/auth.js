const express = require('express');
const router = express.Router();
const path = require('path');

const { api: apiControllerPath } = config.path.controller.v1;

const authController = require(path.join(apiControllerPath, '/authController'));

router.post('/register', authController.validators , authController.register);
router.post('/login', authController.validators , authController.login);

module.exports = router;