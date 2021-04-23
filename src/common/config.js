const path = require('path');
const mongoose = require('mongoose');
const chalk = require('chalk');

// Connect to MongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/merchant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// mongoose.set('debug', { shell: true });

const conn = mongoose.connection;
conn.on('error', () =>
  console.error(chalk.redBright('Mongoose : Connection refused'))
);
conn.once('open', () =>
  console.log(chalk.greenBright('Mongoose : Connected to the database'))
);

// Global Export
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
