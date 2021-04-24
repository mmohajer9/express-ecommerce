const { body } = require('express-validator');
const Validator = require('../base/Validator');
const checkJWT = require('express-jwt');

class AuthValidator extends Validator {
  validators = {
    register: [
      body('firstName').notEmpty().trim().escape(),
      body('lastName')
        .isAlphanumeric()
        .isLength({ min: 6 })
        .notEmpty()
        .trim()
        .escape(),
      body('username').notEmpty().trim().escape(),
      body('email').isEmail().normalizeEmail(),
      body('password')
        .isStrongPassword({
          minLength: 8,
          minLowercase: 1,
          minUppercase: 0,
          minNumbers: 1,
          minSymbols: 0,
          pointsPerUnique: 1,
          pointsPerRepeat: 0.5,
          pointsForContainingLower: 10,
          pointsForContainingUpper: 10,
          pointsForContainingNumber: 10,
          pointsForContainingSymbol: 10,
        })
        .withMessage('Password is too weak, change to a strong one'),
      body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }

        return true;
      }),
    ],
    login: [body('username').notEmpty(), body('password').notEmpty()],
  };

  // * JWT Protected Middleware
  isAuthenticatedJWT = [
    checkJWT({
      secret: config.secret,
      algorithms: ['HS256'],
    }),
    (err, req, res, next) => {
      if (err.name === 'UnauthorizedError') {
        res.status(401).json(err);
      }
    },
  ];
}

module.exports = new AuthValidator();
