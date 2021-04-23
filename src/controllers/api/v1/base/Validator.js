const { validationResult } = require('express-validator');
const checkJWT = require('express-jwt');

// Base Validator
class Validator {
  constructor() {
    this.bindMethods();
  }

  // * models for later references to them
  models = {};

  // * JWT Protected Middleware
  isAuthenticatedJWT = checkJWT({
    secret: config.secret,
    algorithms: ['HS256'],
  });

  // * input validation
  validators = {};

  validationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  }

  bindMethods() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map((key) => {
      if (this[key] instanceof Function && key !== 'constructor')
        this[key] = this[key].bind(this);
    });
  }
}

module.exports = Validator;
