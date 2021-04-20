const path = require('path');

module.exports = {
  scheme: 'http://',
  hostname: 'localhost',
  port: 8000,
  path: {
    controller: {
      v1: {
        // path.resolve will look for resolving from the cwd (current working directory)
        // that is the location which server.js has been called
        api: path.resolve('src', 'controllers', 'api', 'v1'),
        web: path.resolve('src', 'controllers', 'web', 'v1'),
      },
    },
    models: path.resolve('src', 'models'),
  },
};
