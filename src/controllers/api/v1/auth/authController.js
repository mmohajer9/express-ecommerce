const path = require('path');

const { models: modelsPath } = config.path;

const Controller = require('../base/Controller');
const User = require(path.join(modelsPath, '/User'));

class AuthController extends Controller {
  models = {
    User,
  };

  register(req, res) {
    // Actions

    this.models
      .User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .save((err) => {
        if (err) {
          res.status(406).json(err);
        } else {
          res.status(201).json({ msg: 'user has been created successfully' });
        }
      });
  }

  login(req, res) {
    console.log(this);
    res.json('login');
  }
}

module.exports = new AuthController();
