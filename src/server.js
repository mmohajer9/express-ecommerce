const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const chalk = require('chalk');
const morgan = require('morgan');

// Global Config
global.config = require('./common/config');

// Routers
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');

// Express Application Instance
const app = express();

// Security and Performance Middlewares
app.use(helmet());
app.use(compression());

// Request Body Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: 'application/json' }));

// Static Files
app.use('/public', express.static('public'));

// Logging
app.use(morgan('tiny'));

// URL Prefixes
app.use('/', webRouter);
app.use('/api', apiRouter);

// Event-Loop
app.listen(config.port, config.hostname, () => {
  console.log(
    chalk.cyanBright(
      `Server is running at ${config.scheme}${config.hostname}:${config.port}`
    )
  );
});
