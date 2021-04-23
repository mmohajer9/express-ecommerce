const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { models: modelsPath } = config.path;

const Controller = require('../base/Controller');
const User = require(path.join(modelsPath, '/User'));

class AuthController extends Controller {
  models = {
    User,
  };

  register(req, res) {
    // Actions
    const user = new this.models.User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    user.save((err, user) => {
      if (err) {
        res.status(406).json(err);
      } else {
        res.status(201).json({
          msg: 'user has been created successfully',
          success: true,
        });
      }
    });
  }

  async authenticate(username, password) {
    try {
      const user = await this.models.User.findOne({
        username: username,
      });
      const same = await bcrypt.compare(password, user.password);

      return same ? user : null;
    } catch (error) {
      return error;
    }
  }

  loginTransform(item) {
    const token = this.createJWT(item);

    return {
      data: {
        firstName: item.firstName,
        lastName: item.lastName,
        username: item.username,
        _id: item._id,
        email: item.email,
        isAdmin: item.isAdmin,
        profileImage: item.profileImage,
      },
      success: true,
      token: token,
    };
  }

  createJWT(item) {
    const payload = {
      firstName: item.firstName,
      lastName: item.lastName,
      username: item.username,
      _id: item._id,
      email: item.email,
      isAdmin: item.isAdmin,
    };
    const secret = config.secret;
    const options = { expiresIn: '2h' };
    const token = jwt.sign(payload, secret, options);

    return token;
  }

  async login(req, res) {
    const user = await this.authenticate(req.body.username, req.body.password);
    user
      ? res.json(this.loginTransform(user))
      : res.status(422).json({
          msg: 'Entered information is incorrect',
          success: false,
        });
  }
}

module.exports = new AuthController();
