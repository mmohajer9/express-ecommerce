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
    };
  }

  async list(req, res) {
    try {
      const page = req.query.page || 1;
      const users = await this.models.User.paginate({}, { page, limit: 10 });
      res
        .status(200)
        .json({ ...users, docs: this.transformCollection(users.docs) });
    } catch (error) {
      res.status(422).json(error);
    }
  }

  async detail(req, res) {
    const { username } = req.params;
    const isOwner = req.user.username === username;

    try {
      const user = await this.models.User.findOne({ username }).populate(
        isOwner ? 'addresses' : '',
        'postalCode line1'
      );
      user
        ? res.json(user)
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
