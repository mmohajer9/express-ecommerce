class MainController {
  index(req, res) {
    res.status(200).json({ message: 'This is api.v1 Main route' });
  }

  version(req, res) {
    res.json({ version: 1 });
  }
}

module.exports = new MainController();
