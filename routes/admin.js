const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { getConfig, saveConfig } = require('../data/config');
const site = require('../data/site');
const { requireAuth } = require('./middleware');

// ── LOGIN ──
router.get('/login', (req, res) => {
  if (req.session && req.session.adminLoggedIn) return res.redirect('/admin');
  res.render('admin/login', { error: null, title: 'Admin Login' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const cfg = getConfig();
  const validUser = username === cfg.username;
  const validPass = await bcrypt.compare(password, cfg.passwordHash);
  if (validUser && validPass) {
    req.session.adminLoggedIn = true;
    req.session.adminUser = username;
    return res.redirect('/admin');
  }
  res.render('admin/login', { error: 'Invalid username or password.', title: 'Admin Login' });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// ── DASHBOARD ──
router.get('/', requireAuth, (req, res) => {
  const cfg = getConfig();
  res.render('admin/dashboard', {
    title: 'Admin Dashboard',
    cfg,
    site,
    stats: {
      services: site.services.length,
      states: site.states.length,
      cities: site.cities.length,
      pages: site.services.length + site.states.length + site.cities.length + 8,
    },
    flash: req.session.flash || null,
  });
  req.session.flash = null;
});

// ── SETTINGS ──
router.get('/settings', requireAuth, (req, res) => {
  const cfg = getConfig();
  res.render('admin/settings', {
    title: 'Site Settings',
    cfg,
    flash: req.session.flash || null,
  });
  req.session.flash = null;
});

router.post('/settings', requireAuth, (req, res) => {
  const cfg = getConfig();
  const { phone, phoneHref, email, siteName, tagline, heroTitle, heroDesc,
    googleAnalyticsId, facebookPixelId, ringbaNumber, metaDescription } = req.body;
  Object.assign(cfg, { phone, phoneHref, email, siteName, tagline, heroTitle,
    heroDesc, googleAnalyticsId, facebookPixelId, ringbaNumber, metaDescription });
  saveConfig(cfg);
  req.session.flash = { type: 'success', msg: '✅ Settings saved successfully!' };
  res.redirect('/admin/settings');
});

// ── CHANGE PASSWORD ──
router.post('/change-password', requireAuth, async (req, res) => {
  const cfg = getConfig();
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const validCurrent = await bcrypt.compare(currentPassword, cfg.passwordHash);
  if (!validCurrent) {
    req.session.flash = { type: 'error', msg: '❌ Current password is incorrect.' };
    return res.redirect('/admin/settings');
  }
  if (newPassword !== confirmPassword) {
    req.session.flash = { type: 'error', msg: '❌ New passwords do not match.' };
    return res.redirect('/admin/settings');
  }
  if (newPassword.length < 8) {
    req.session.flash = { type: 'error', msg: '❌ Password must be at least 8 characters.' };
    return res.redirect('/admin/settings');
  }
  cfg.passwordHash = await bcrypt.hash(newPassword, 10);
  saveConfig(cfg);
  req.session.flash = { type: 'success', msg: '✅ Password changed successfully!' };
  res.redirect('/admin/settings');
});

// ── SERVICES ──
router.get('/services', requireAuth, (req, res) => {
  res.render('admin/services', {
    title: 'Manage Services',
    services: site.services,
    flash: req.session.flash || null,
  });
  req.session.flash = null;
});

// ── LOCATIONS ──
router.get('/locations', requireAuth, (req, res) => {
  res.render('admin/locations', {
    title: 'Manage Locations',
    states: site.states,
    cities: site.cities,
    flash: req.session.flash || null,
  });
  req.session.flash = null;
});

// ── PAGES ──
router.get('/pages', requireAuth, (req, res) => {
  const cfg = getConfig();
  const allPages = [
    { url: '/', name: 'Homepage', type: 'Core' },
    { url: '/about', name: 'About', type: 'Core' },
    { url: '/contact', name: 'Contact', type: 'Core' },
    { url: '/locations', name: 'All Locations', type: 'Core' },
    { url: '/blog', name: 'Blog', type: 'Core' },
    ...site.services.map(s => ({ url: `/services/${s.slug}`, name: s.name, type: 'Service' })),
    ...site.states.map(s => ({ url: `/cleaning-services-${s.slug}`, name: s.name, type: 'State' })),
    ...site.cities.map(c => ({ url: `/house-cleaning-${c.slug}-${c.stateAbbr.toLowerCase()}`, name: `${c.name}, ${c.stateAbbr}`, type: 'City', phase: c.phase })),
  ];
  res.render('admin/pages', {
    title: 'All Pages',
    allPages,
    cfg,
    flash: req.session.flash || null,
  });
  req.session.flash = null;
});

module.exports = router;
