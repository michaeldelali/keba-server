const express = require('express');
const router = express.Router();

router.get(
  '/',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
    })
  }
);

module.exports = router;