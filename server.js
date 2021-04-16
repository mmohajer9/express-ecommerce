const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/merchant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Global Config
global.config = require('./src/common/config');

// Routers
const webRouter = require('./src/routes/web');
const apiRouter = require('./src/routes/api');

// Express Application Instance
const app = express();

// Request Body Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: 'application/json' }));

// URL Prefixes
app.use('/', webRouter);
app.use('/api', apiRouter);

// Event-Loop
app.listen(config.port, config.hostname, () => {
  console.log(
    `Server is running at ${config.scheme}${config.hostname}:${config.port}`
  );
});
