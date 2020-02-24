const express = require('express');

const emojis = require('./emojis');
const winnipegParks = require('./winnipeg-parks');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);

router.use('/winnipeg-parks', winnipegParks);

module.exports = router;
