const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');

const homeRouter = require('./routes/home');
const servicesRouter = require('./routes/services');
const statesRouter = require('./routes/states');
const citiesRouter = require('./routes/cities');
const pagesRouter = require('./routes/pages');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'fyndlocals-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 8 }, // 8 hours
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Inject live config into all public views
app.use((req, res, next) => {
  if (!req.path.startsWith('/admin')) {
    try {
      const { getConfig } = require('./data/config');
      const cfg = getConfig();
      res.locals.liveConfig = cfg;
    } catch(e) { res.locals.liveConfig = null; }
  }
  next();
});

// Routes
app.use('/admin', adminRouter);
app.use('/', homeRouter);
app.use('/services', servicesRouter);
app.use('/', statesRouter);
app.use('/', citiesRouter);
app.use('/', pagesRouter);

// 404
app.use((req, res) => {
  const site = require('./data/site');
  res.status(404).render('pages/404', { title: 'Page Not Found', site });
});

app.listen(PORT, () => {
  console.log(`✅ FyndLocals running at http://localhost:${PORT}`);
  console.log(`🔐 Admin panel at http://localhost:${PORT}/admin`);
  console.log(`   Default login: admin / password`);
});

module.exports = app;
