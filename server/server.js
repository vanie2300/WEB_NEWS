require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
const homeRoutes = require('./routes/home.routes');
const categoryRoutes = require('./routes/category.routes');
const searchRoutes = require('./routes/search.routes');
const articleRoutes = require('./routes/article.routes');
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const ALLOWED_ORIGINS = [
/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/
];
if (process.env.ALLOWED_ORIGIN) {
ALLOWED_ORIGINS.push(new RegExp('^' + process.env.ALLOWED_ORIGIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*') + '$'));
}
app.use(compression());
app.use(helmet({
contentSecurityPolicy: false,
crossOriginEmbedderPolicy: false
}));
app.use(cors({
origin: function(origin, callback) {
if (!origin || ALLOWED_ORIGINS.some(function(r) { return r.test(origin); })) {
callback(null, true);
} else {
callback(new Error('Not allowed by CORS'));
}
},
credentials: true
}));
app.use(express.json());
const apiLimiter = rateLimit({
windowMs: 60 * 1000,
max: 60,
standardHeaders: true,
legacyHeaders: false,
message: { error: 'Too many requests, please try again later' }
});
app.use('/api', apiLimiter);
app.use(express.static(path.join(__dirname, '../client'), {
maxAge: NODE_ENV === 'production' ? '1h' : 0,
etag: true
}));
app.use(homeRoutes);
app.use(categoryRoutes);
app.use(searchRoutes);
app.use(articleRoutes);
app.use('/api', (req, res) => { res.status(404).json({ error: 'API endpoint not found' }); });
app.get('/{*path}', (req, res) => {
res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.use(errorHandler);
app.listen(PORT, () => {
console.log(`[NEWS] Server running on port ${PORT} (${NODE_ENV})`);
const keys = { NEWS_API_KEY: process.env.NEWS_API_KEY, GNEWS_API_KEY: process.env.GNEWS_API_KEY, NEWSDATA_API_KEY: process.env.NEWSDATA_API_KEY };
const missing = Object.entries(keys).filter(([, v]) => !v).map(([k]) => k);
if (missing.length) console.warn(`[WARN] Missing API keys: ${missing.join(', ')} — those providers will return empty results`);
});
