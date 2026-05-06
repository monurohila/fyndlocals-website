# FyndLocals – Pay Per Call Cleaning Website

A production-ready Node.js/Express website targeting US cleaning service searches.

## Tech Stack
- **Runtime:** Node.js v18+
- **Framework:** Express.js
- **Templates:** EJS
- **CSS:** Custom (no frameworks)

## Project Structure
```
fyndlocals/
├── app.js              # Entry point
├── data/site.js        # All content, cities, services
├── routes/             # Express route handlers
│   ├── home.js
│   ├── services.js
│   ├── states.js
│   ├── cities.js
│   └── pages.js
├── views/
│   ├── partials/       # nav, footer, head, cta-band
│   └── pages/          # All page templates
├── public/
│   ├── css/style.css
│   └── js/main.js
└── package.json
```

## Local Development
```bash
npm install
npm start
# Visit http://localhost:3000
```

## Key Pages
- `/` — Homepage
- `/services` — All services
- `/services/house-cleaning` — Individual service (swap slug)
- `/cleaning-services-florida` — State pages (swap state slug)
- `/house-cleaning-miami-fl` — City pages (city-state)
- `/locations` — All locations
- `/about`, `/contact`, `/blog`

## Go Live – Deployment Options

### Option 1: Railway (Recommended – Easiest)
1. Push to GitHub
2. Go to railway.app → New Project → Deploy from GitHub
3. Set env var: `PORT=3000`
4. Done — live URL in 2 minutes

### Option 2: Render
1. Push to GitHub
2. render.com → New Web Service → connect repo
3. Build command: `npm install`
4. Start command: `node app.js`
5. Free tier available

### Option 3: VPS (DigitalOcean / Hetzner)
```bash
# On your server:
git clone your-repo
cd fyndlocals
npm install
npm install -g pm2
pm2 start app.js --name fyndlocals
pm2 save && pm2 startup
# Point your domain via Nginx reverse proxy to port 3000
```

### Option 4: Connect to fyndlocals.com (Existing Domain)
1. Deploy to Railway or VPS
2. In your domain registrar (wherever fyndlocals.com is registered):
   - Add CNAME record pointing to Railway/Render URL
   - Or update A record to your VPS IP
3. Add SSL via Let's Encrypt (free) or your host's auto-SSL

## Before Going Live Checklist
- [ ] Replace `(800) 555-0100` in `data/site.js` with your real tracking number
- [ ] Update `hello@fyndlocals.com` with real email
- [ ] Add Google Analytics ID to `views/partials/head.ejs`
- [ ] Set up Google Search Console
- [ ] Add your Facebook Pixel in head.ejs
- [ ] Submit sitemap to Google (generate at /sitemap.xml)

## Pay Per Call Setup
1. Sign up at Service Direct, Ringba, or Aragon Advertising
2. Get your tracking phone number
3. Replace the phone in `data/site.js`:
   ```js
   phone: '(XXX) XXX-XXXX',
   phoneHref: 'tel:+1XXXXXXXXXX',
   ```
4. Deploy and start driving traffic
