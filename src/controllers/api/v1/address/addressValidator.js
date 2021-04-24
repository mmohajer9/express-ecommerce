const { body, param } = require('express-validator');
const Validator = require('../base/Validator');

class AddressValidator extends Validator {
  validators = {
    create: [
      body('postalCode').notEmpty().isPostalCode('IR').trim().escape(),
      body('line1').notEmpty().trim().escape(),
      body('line2').optional().trim().escape(),
    ],
    update: [
      body('postalCode').optional().isPostalCode('IR').trim().escape(),
      body('line1').optional().trim().escape(),
      body('line2').optional().trim().escape(),
    ],
    detail: [param('id').notEmpty().isMongoId()],
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
