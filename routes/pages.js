const express = require('express');
const router = express.Router();
const site = require('../data/site');

router.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About FyndLocals – Trusted Cleaning Nationwide', meta: 'Learn about FyndLocals — our story, mission, and commitment to quality cleaning services across the USA.', site, page: 'about' });
});

router.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Contact FyndLocals – Get a Free Quote', meta: 'Reach out to FyndLocals for a free cleaning quote or to book a cleaner today.', site, page: 'contact' });
});

router.get('/get-a-quote', (req, res) => {
  res.render('pages/contact', { title: 'Get a Free Cleaning Quote – FyndLocals', meta: 'Get a free, no-obligation cleaning quote from FyndLocals. Same-day service available.', site, page: 'contact' });
});

router.get('/locations', (req, res) => {
  res.render('pages/locations', { title: 'Cleaning Services Locations – FyndLocals', meta: 'FyndLocals serves 30+ cities across 12 US states. Find professional cleaning services near you.', site, page: 'locations' });
});

router.get('/blog', (req, res) => {
  const posts = [
    { slug: 'how-often-should-you-clean', title: 'How Often Should You Deep Clean Your Home?', date: 'April 28, 2025', excerpt: 'A guide to cleaning frequency for busy households — what to do daily, weekly, and monthly.', category: 'Tips' },
    { slug: 'airbnb-cleaning-checklist', title: 'The Ultimate Airbnb Cleaning Checklist for 5-Star Reviews', date: 'April 15, 2025', excerpt: 'Everything you need to check before your next guest arrives — a room-by-room breakdown.', category: 'Airbnb' },
    { slug: 'move-out-cleaning-tips', title: 'Move-Out Cleaning: How to Get Your Full Deposit Back', date: 'April 2, 2025', excerpt: 'Landlords check these spots first. Here\'s what to prioritize when cleaning before you move.', category: 'Moving' },
    { slug: 'green-cleaning-products', title: 'Best Eco-Friendly Cleaning Products in 2025', date: 'March 20, 2025', excerpt: 'Safe for kids and pets, tough on dirt. Our top picks for green cleaning supplies.', category: 'Products' },
  ];
  res.render('pages/blog', { title: 'Cleaning Tips & Guides – FyndLocals Blog', meta: 'Cleaning tips, guides, and resources from the FyndLocals team.', site, posts, page: 'blog' });
});

router.get('/privacy-policy', (req, res) => {
  res.render('pages/privacy', { title: 'Privacy Policy – FyndLocals', meta: 'FyndLocals privacy policy.', site, page: '' });
});

router.get('/terms', (req, res) => {
  res.render('pages/terms', { title: 'Terms of Service – FyndLocals', meta: 'FyndLocals terms of service.', site, page: '' });
});

module.exports = router;
