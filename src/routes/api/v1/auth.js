const express = require('express');
const router = express.Router();
const path = require('path');

const { api: apiControllerPath } = config.path.controller.v1;

const authController = require(path.join(apiControllerPath, '/auth/authController'));
const authValidator = require(path.join(apiControllerPath, '/auth/authValidator'));

router.post(
  '/register',
  authValidator.validators.register,
  authValidator.validationResult,
  authController.register
);
router.post(
  '/login',
  authValidator.validators.login,
  authValidator.validationResult,
  authController.login
);

module.exports = router;
