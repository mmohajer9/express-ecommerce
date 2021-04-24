const express = require('express');
const router = express.Router();
const path = require('path');

const { api: apiControllerPath } = config.path.controllers.v1;
const { middlewares: middlewaresPath } = config.path;

const authValidator = require(path.join(
  apiControllerPath,
  '/auth/authValidator'
));

const { imageUpload } = require(path.join(
  middlewaresPath,
  '/uploadMiddleware'
));

const addressController = require(path.join(
  apiControllerPath,
  '/address/addressController'
));
const addressValidator = require(path.join(
  apiControllerPath,
  '/address/addressValidator'
));

const userController = require(path.join(
  apiControllerPath,
  '/user/userController'
));
const userValidator = require(path.join(
  apiControllerPath,
  '/user/userValidator'
));

router.get('/', authValidator.isAuthenticatedJWT, userController.list);
router
  .route('/:username')
  .get(authValidator.isAuthenticatedJWT, userController.detail)
  .put(
    authValidator.isAuthenticatedJWT,
    userValidator.isOwner,
    userValidator.validators.update,
    userValidator.validationResult,
    imageUpload.single('profileImage'),
    userController.update
  );
router
  .route('/:username/addresses')
  .get(
    authValidator.isAuthenticatedJWT,
    addressValidator.isOwner,
    addressController.list
  )
  .post(
    authValidator.isAuthenticatedJWT,
    addressValidator.isOwner,
    addressValidator.validators.create,
    addressValidator.validationResult,
    addressController.create
  );
router
  .route('/:username/addresses/:id')
  .get(
    authValidator.isAuthenticatedJWT,
    addressValidator.validators.detail,
    addressValidator.validationResult,
    addressValidator.isOwner,
    addressController.detail
  )
  .put(
    authValidator.isAuthenticatedJWT,
    addressValidator.isOwner,
    addressValidator.validators.update,
    addressValidator.validationResult,
    addressController.update
  )
  .delete(
    authValidator.isAuthenticatedJWT,
    addressValidator.isOwner,
    addressController.destroy
  );

module.exports = router;
