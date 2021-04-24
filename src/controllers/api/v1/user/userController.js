const path = require('path');
const { models: modelsPath } = config.path;

const User = require(path.join(modelsPath, '/User'));
const Controller = require('../base/Controller');

class UserController extends Controller {
  models = {
    User,
  };

  transform(item) {
    return {
      _id: item._id,
      username: item.username,
      email: item.email,
      firstName: item.firstName,
      lastName: item.lastName,
      profileImage: item.profileImage,
      isAdmin: item.isAdmin,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      orders: item.orders,
      addresses: item.addresses,
    };
  }

  async list(req, res) {
    const users = await this.models.User.find();

    res.status(200).json(this.transformCollection(users));
  }

  async detail(req, res) {
    const { username } = req.params;
    try {
      const user = await this.models.User.findOne({ username });
      user
        ? res.json(this.transform(user))
        : res.status(404).json({
            msg: 'User has not been found',
            success: false,
          });
    } catch (error) {
      res.status(422).json(error);
    }
  }

  async update(req, res) {
    const { username } = req.params;
    const urlprefix = `${config.scheme}${config.hostname}:${config.port}`;
    const profileImage = req.file
      ? path.join(urlprefix, req.file.path)
      : undefined;

    const payload = profileImage
      ? { ...req.body, profileImage }
      : { ...req.body };

    try {
      const user = await this.models.User.findOneAndUpdate(
        { username },
        payload,
        { new: true }
      );
      user
        ? res.json(this.transform(user))
        : res.status(404).json({
            msg: 'User has not been found',
            success: false,
          });
    } catch (error) {
      res.status(422).json(error);
    }
  }

  version(req, res) {
    res.json({ version: 1 });
  }
}

module.exports = new UserController();
