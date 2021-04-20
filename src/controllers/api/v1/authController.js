const Controller = require('./base/Controller');

class AuthController extends Controller {
  register(req, res) {
    // Validation - Sanitize
    // Show Errors
    // Actions
  }

  login(req, res) {
    res.json('login');
  }
}

module.exports = new AuthController();
