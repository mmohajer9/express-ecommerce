const path = require('path');

const { models: modelsPath } = config.path;

const Controller = require('../base/Controller');
const User = require(path.join(modelsPath, '/User'));

class AddressController extends Controller {
  models = {
    User,
  };
}

module.exports = new AddressController();
