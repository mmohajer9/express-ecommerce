const { body } = require('express-validator');
const Validator = require('../base/Validator');

class AddressValidator extends Validator {
  validators = {
    create: [
      body('postalCode').notEmpty().isPostalCode('IR').trim().escape(),
      body('line1').notEmpty().trim().escape(),
      body('line2').optional().trim().escape(),
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

module.exports = new AddressValidator();
