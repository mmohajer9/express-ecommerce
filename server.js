const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const chalk = require('chalk');

// Global Config
global.config = require('./src/common/config');

// Routers
const webRouter = require('./src/routes/web');
const apiRouter = require('./src/routes/api');

// Express Application Instance
const app = express();

// Security and Performance Middlewares
app.use(helmet());
app.use(compression());

// Request Body Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: 'application/json' }));

// URL Prefixes
app.use('/', webRouter);
app.use('/api', apiRouter);

// Event-Loop
app.listen(config.port, config.hostname, () => {
  console.log(
    chalk.blueBright(
      `Server is running at ${config.scheme}${config.hostname}:${config.port}`
    )
  );
});
