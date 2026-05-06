const express = require('express');
const router = express.Router();
const site = require('../data/site');

// All services listing
router.get('/', (req, res) => {
  res.render('pages/services', {
    title: 'Cleaning Services – FyndLocals',
    meta: 'Professional house cleaning, deep cleaning, move-in/out, Airbnb, and commercial cleaning services across the USA.',
    site,
    page: 'services',
  });
});

// Individual service page
router.get('/:slug', (req, res) => {
  const service = site.services.find(s => s.slug === req.params.slug);
  if (!service) return res.status(404).render('pages/404', { title: 'Not Found' });

  res.render('pages/service-detail', {
    title: `${service.name} Services – FyndLocals`,
    meta: `${service.shortDesc} Available nationwide. Call for a free instant quote.`,
    site,
    service,
    page: 'services',
  });
});

module.exports = router;
