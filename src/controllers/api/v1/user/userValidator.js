const { body } = require('express-validator');
const Validator = require('../base/Validator');

class UserValidator extends Validator {
  validators = {
    update: [
      body('firstName').optional().notEmpty().trim().escape(),
      body('lastName')
        .optional()
        .isAlphanumeric()
        .isLength({ min: 6 })
        .notEmpty()
        .trim()
        .escape(),
      body('username').optional().notEmpty().trim().escape(),
      body('email').optional().isEmail().normalizeEmail(),
    ],
  };
}

module.exports = new UserValidator();
