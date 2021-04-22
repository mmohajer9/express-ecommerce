const path = require('path');

const { models: modelsPath } = config.path;
var mongoose = require('mongoose');

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

  login(req, res) {
    console.log(this);
    res.json('login');
  }
}

module.exports = new AuthController();
