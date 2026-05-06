const express = require('express');
const router = express.Router();
const site = require('../data/site');

// State landing page: /cleaning-services-florida
router.get(/^\/cleaning-services-(.+)$/, (req, res) => {
  const slug = req.params[0];
  const state = site.states.find(s => s.slug === slug);
  if (!state) return res.status(404).render('pages/404', { title: 'Not Found', site });

  const stateCities = site.cities.filter(c => state.cities.includes(c.slug));

  res.render('pages/state', {
    title: `House Cleaning Services in ${state.name} – FyndLocals`,
    meta: `Trusted house cleaning in ${state.name}. Vetted cleaners, same-day availability in ${stateCities.map(c => c.name).join(', ')}.`,
    site,
    state,
    stateCities,
    page: 'locations',
  });
});

module.exports = router;
