const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/merchant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Global Config
global.config = require(path.join(__dirname, './src/common/config'));

const webRouter = require(path.join(__dirname, './src/routes/web'));
const apiRouter = require(path.join(__dirname, './src/routes/api'));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: 'application/json' }));

// URL Prefixes
app.use('/', webRouter);
app.use('/api', apiRouter);

app.listen(config.port, config.hostname, () => {
  console.log(
    `Server is running at ${config.protocol}${config.hostname}:${config.port}`
  );
});
