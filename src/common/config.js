const path = require('path');
const mongoose = require('mongoose');
const chalk = require('chalk');

// Connect to MongoDB
const db = mongoose.connect('mongodb://127.0.0.1:27017/merchant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// mongoose.set('debug', { shell: true });

const conn = mongoose.connection;
conn.on('error', () =>
  console.error(chalk.redBright('Mongoose : Connection refused'))
);
conn.once('open', () =>
  console.log(chalk.blueBright('Mongoose : Connected to the database'))
);

// Global Export
module.exports = {
  secret: 'm946_t1sr4#!m6ngfi6le@mtn-hbcmhd7q9&x#kuktq$7t$tv_',
  scheme: 'http://',
  hostname: 'localhost',
  port: 8000,
  path: {
    controllers: {
      v1: {
        // path.resolve will look for resolving from the cwd (current working directory)
        // that is the location which server.js has been called
        api: path.resolve('src', 'controllers', 'api', 'v1'),
        web: path.resolve('src', 'controllers', 'web', 'v1'),
      },
    },
    models: path.resolve('src', 'models'),
    middlewares: path.resolve('src', 'middlewares'),
  },
};
