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

  isOwner(req, res, next) {
    const { username: targetUsername } = req.params;
    const { username } = req.user;
    if (username === targetUsername) {
      next();
    } else {
      res.status(403).json({
        msg: 'You are not allowed to do this action',
        success: false,
      });
    }
  }
}

module.exports = new UserValidator();
