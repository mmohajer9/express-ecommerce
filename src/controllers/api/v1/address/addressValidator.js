const { body } = require('express-validator');
const Validator = require('../base/Validator');

class AddressValidator extends Validator {
  validators = {};
}

module.exports = new AddressValidator();
