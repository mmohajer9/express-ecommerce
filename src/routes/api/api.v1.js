const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('Welcome To API Page');
});

router.get('/products', (req, res) => {
  res.json('Welcome To Products Page');
});

module.exports = router;
