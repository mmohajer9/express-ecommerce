const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  res.json('Welcome To API Page');
});

router.get('/products', (req, res) => {
  res.json('Welcome To Products Page');
});

module.exports = router;