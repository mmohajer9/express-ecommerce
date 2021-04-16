const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('Welcome To API Page');
});

module.exports = router;
