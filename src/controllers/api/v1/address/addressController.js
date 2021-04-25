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
      const addrs = await this.models.Address.find({
        user: req.user._id,
      }).populate('user', 'username email');
      res.json(addrs);
    } catch (error) {
      res.status(422).json(error);
    }
  }

  async create(req, res) {
    try {
      const user = await this.models.User.findOne({ _id: req.user._id }).orFail();

      const address = await this.models.Address.create({
        user: req.user._id,
        line1: req.body.line1,
        line2: req.body.line2,
        postalCode: req.body.postalCode,
      });

      user.addresses.push(address._id);
      const updatedUser = await user.save();
      res.json(address);
    } catch (error) {
      res.status(422).json(error);
    }
  }

  async detail(req, res) {
    try {
      const { id } = req.params;
      const address = await this.models.Address.findOne({ _id: id })
        .populate('user', 'username email')
        .orFail();
      res.json(address);
    } catch (error) {
      res.status(422).json(error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const payload = { ...req.body };
      const address = await this.models.Address.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
      )
        .populate('user', 'username email')
        .orFail();

      res.json(address);
    } catch (error) {
      res.status(422).json(error);
    }
  }
  async destroy(req, res) {
    try {
      const { id } = req.params;

      const address = await this.models.Address.deleteOne({
        _id: id,
      }).orFail();

      const user = await this.models.User.findOne({
        username: req.user.username,
      });

      user.addresses.pull({ _id: id });
      await user.save();

      res.json(address);
    } catch (error) {
      res.status(422).json(error);
    }
  }
}

module.exports = new AddressController();
