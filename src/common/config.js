const path = require('path');

module.exports = {
  scheme: 'http://',
  hostname: 'localhost',
  port: 8000,
  path: {
    controller: {
      v1: {
        api: path.resolve('src', 'controllers', 'api', 'v1'),
        web: path.resolve('src', 'controllers', 'web', 'v1'),
      },
    },
    models: path.resolve('src', 'models'),
  },
};
