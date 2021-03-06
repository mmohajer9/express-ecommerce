const express = require('express');
const router = express.Router();
const path = require('path');

const { api: apiControllerPath } = config.path.controllers.v1;

const homeController = require(path.join(apiControllerPath, '/home/homeController'));

router.get('/', homeController.index);
router.get('/version', homeController.version);

module.exports = router;
