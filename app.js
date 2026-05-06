const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const homeRouter = require('./routes/home');
const servicesRouter = require('./routes/services');
const statesRouter = require('./routes/states');
const citiesRouter = require('./routes/cities');
const pagesRouter = require('./routes/pages');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & performance
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan('dev'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', homeRouter);
app.use('/services', servicesRouter);
app.use('/', statesRouter);
app.use('/', citiesRouter);
app.use('/', pagesRouter);

// 404
app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`✅ FyndLocals running at http://localhost:${PORT}`);
});

module.exports = app;
