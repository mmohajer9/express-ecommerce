const express = require('express');
const router = express.Router();
const path = require('path');

const { api: apiControllerPath } = config.path.controller.v1;

const HomeController = require(path.join(apiControllerPath, '/HomeController'));

router.get('/', HomeController.index);
router.get('/version', HomeController.version);

module.exports = router;
