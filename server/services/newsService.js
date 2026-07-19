const newsapi = require('../providers/newsapi');
const gnews = require('../providers/gnews');
const newsdata = require('../providers/newsdata');
const { normalize } = require('../utils/normalize');
const { deduplicate, removeIncomplete } = require('../utils/deduplicate');
const CATEGORIES = ['technology', 'business', 'sports', 'science', 'entertainment', 'health'];
const VALID_CATEGORIES = [...CATEGORIES, 'world'];
const providers = [newsapi, gnews, newsdata];
const cache = new Map();
const CACHE_TTL = 60000;
function getCached(key) {
const entry = cache.get(key);
if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data;
cache.delete(key);
return null;
}
function setCache(key, data) {
cache.set(key, { data, ts: Date.now() });
if (cache.size > 50) { const first = cache.keys().next().value; cache.delete(first); }
}
async function fetchCategory(category, size = 20) {
const ck = `cat:${category}:${size}`;
const cached = getCached(ck);
if (cached) return cached;
const results = await Promise.allSettled(
providers.map(p => p.fetchTopHeadlines(category, 'us', size))
);
let all = [];
for (let i = 0; i < results.length; i++) {
if (results[i].status === 'fulfilled') {
const providerName = providers[i].name;
const raw = results[i].value;
all = all.concat(raw.map(a => normalize(a, providerName)));
}
}
all = removeIncomplete(deduplicate(all));
all.sort((a, b) => {
const da = new Date(a.publishedAt).getTime();
const db = new Date(b.publishedAt).getTime();
return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
});
setCache(ck, all);
return all;
}
async function fetchHome() {
const ck = 'home';
const cached = getCached(ck);
if (cached) return cached;
const results = await Promise.allSettled(
providers.map(p => p.fetchTopHeadlines('general', 'us', 30))
);
let all = [];
for (let i = 0; i < results.length; i++) {
if (results[i].status === 'fulfilled') {
const providerName = providers[i].name;
all = all.concat(results[i].value.map(a => normalize(a, providerName)));
}
}
all = removeIncomplete(deduplicate(all));
all.sort((a, b) => {
const da = new Date(a.publishedAt).getTime();
const db = new Date(b.publishedAt).getTime();
return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
});
const featured = all[0] || null;
const trending = all.slice(1, 6);
const categoryResults = await Promise.allSettled(
CATEGORIES.map(cat => fetchCategory(cat, 5))
);
const categories = {};
CATEGORIES.forEach((cat, i) => {
categories[cat] = categoryResults[i].status === 'fulfilled' ? categoryResults[i].value : [];
});
const latest = all.slice(0, 20);
const data = { featured, trending, latest, categories };
setCache(ck, data);
return data;
}
async function searchArticles(query) {
const ck = `search:${query.toLowerCase().trim()}`;
const cached = getCached(ck);
if (cached) return cached;
const results = await Promise.allSettled(
providers.map(p => p.searchEverything(query, 20))
);
let all = [];
for (let i = 0; i < results.length; i++) {
if (results[i].status === 'fulfilled') {
const providerName = providers[i].name;
all = all.concat(results[i].value.map(a => normalize(a, providerName)));
}
}
all = removeIncomplete(deduplicate(all));
all.sort((a, b) => {
const da = new Date(a.publishedAt).getTime();
const db = new Date(b.publishedAt).getTime();
return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
});
setCache(ck, all);
return all;
}
async function getArticle(url) {
const decoded = decodeURIComponent(url);
for (const [, entry] of cache) {
if (entry && Date.now() - entry.ts < CACHE_TTL && Array.isArray(entry.data)) {
const found = entry.data.find(a => a.url === decoded);
if (found) return found;
}
}
for (const [, entry] of cache) {
if (entry && Date.now() - entry.ts < CACHE_TTL && entry.data && entry.data.latest) {
const found = entry.data.latest.find(a => a.url === decoded);
if (found) return found;
for (const cat of Object.values(entry.data.categories || {})) {
const found2 = Array.isArray(cat) ? cat.find(a => a.url === decoded) : null;
if (found2) return found2;
}
}
}
return null;
}
module.exports = { fetchHome, fetchCategory, searchArticles, getArticle, VALID_CATEGORIES };
