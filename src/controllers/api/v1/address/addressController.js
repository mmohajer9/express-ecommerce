const path = require('path');

const { models: modelsPath } = config.path;

const Controller = require('../base/Controller');
const User = require(path.join(modelsPath, '/User'));
const Address = require(path.join(modelsPath, '/Address'));
class AddressController extends Controller {
  models = {
    User,
    Address,
  };

  async list(req, res) {
    try {
      const addrs = await this.models.Address.find({ user: req.user._id });
      res.json(addrs);
    } catch (error) {
      res.status(422).json(error);
    }
  }

  async create(req, res) {
    try {
      const address = await this.models.Address.create({
        user: req.user._id,
        line1: req.body.line1,
        line2: req.body.line2,
        postalCode: req.body.postalCode,
      });

      const user = await this.models.User.findOne({ _id: req.user._id });

      user.addresses.push(address._id);
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(422).json(error);
    }
  }
}

module.exports = new AddressController();
