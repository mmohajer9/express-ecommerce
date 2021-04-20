const Controller = require('./base/Controller');
class HomeController extends Controller {
  index(req, res) {
    res.status(200).json({ message: 'This is api.v1 index route' });
  }

  version(req, res) {
    res.json({ version: 1 });
  }
}

module.exports = new HomeController();
