const express = require('express');
const router = express.Router();
const site = require('../data/site');

router.get('/', (req, res) => {
  res.render('pages/home', {
    title: 'FyndLocals – Trusted House Cleaning Services Across the USA',
    meta: 'Find vetted, affordable house cleaning services near you. Same-day availability. 50,000+ homes cleaned. Serving 30+ US cities.',
    site,
    page: 'home',
  });
});

module.exports = router;
