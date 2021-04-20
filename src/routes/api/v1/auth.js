const express = require('express');
const router = express.Router();
const path = require('path');

const { api: apiControllerPath } = config.path.controller.v1;

const authController = require(path.join(apiControllerPath, '/authController'));

router.get('/', authController.index);
router.get('/version', authController.version);

module.exports = router;
