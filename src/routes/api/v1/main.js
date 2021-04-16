const express = require('express');
const router = express.Router();
const path = require('path');

const { api: apiControllerPath } = config.path.controller.v1;

const MainController = require(path.join(apiControllerPath, '/MainController'));

router.get('/', MainController.index);
router.get('/version', MainController.version);

module.exports = router;
