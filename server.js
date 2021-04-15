const express = require('express');
const path = require('path');

const webRouter = require(path.join(__dirname, './src/routes/web'));
const apiRouter = require(path.join(__dirname, './src/routes/api'));

global.config = require(path.join(__dirname, './src/common/config'));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: 'application/json' }));
app.use('/', webRouter);
app.use('/api', apiRouter);

app.listen(config.port, config.hostname, () => {
  console.log(
    `Server is running at ${config.protocol}${config.hostname}:${config.port}`
  );
});
