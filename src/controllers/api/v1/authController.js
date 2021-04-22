const Controller = require('./base/Controller');

class AuthController extends Controller {
  
  register(req, res) {
    // Validation - Sanitize
    // Show Errors
    // Actions
    res.json('register');
  }

  login(req, res) {
    console.log(this);
    res.json('login');
  }
}

module.exports = new AuthController();