const express = require('express');
const router = express.Router();
const site = require('../data/site');

// City page: /house-cleaning-miami-fl
router.get(/^\/house-cleaning-(.+)$/, (req, res) => {
  const param = req.params[0];
  const city = site.cities.find(c => {
    const expected = `${c.slug}-${c.stateAbbr.toLowerCase()}`;
    return expected === param;
  });
  if (!city) return res.status(404).render('pages/404', { title: 'Not Found', site });

  res.render('pages/city', {
    title: `House Cleaning in ${city.name}, ${city.stateAbbr} – FyndLocals`,
    meta: `Professional house cleaning in ${city.name}, ${city.state}. Same-day service, vetted cleaners. Call now for a free instant quote.`,
    site,
    city,
    page: 'locations',
  });
});

module.exports = router;
