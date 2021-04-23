const express = require('express');
const router = express.Router();
const path = require('path');

const { api: apiControllerPath } = config.path.controllers.v1;
const { middlewares: middlewaresPath } = config.path;

const { imageUpload } = require(path.join(
  middlewaresPath,
  '/uploadMiddleware'
));

const userController = require(path.join(
  apiControllerPath,
  '/user/userController'
));
const userValidator = require(path.join(
  apiControllerPath,
  '/user/userValidator'
));

router.get('/', userValidator.isAuthenticatedJWT, userController.list);
router
  .route('/:username')
  .get(userValidator.isAuthenticatedJWT, userController.detail)
  .put(
    userValidator.isAuthenticatedJWT,
    userValidator.validators.update,
    userValidator.validationResult,
    imageUpload.single('profileImage'),
    userController.update
  );

module.exports = router;
