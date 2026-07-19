const axios = require('axios');
const API_KEY = process.env.NEWSDATA_API_KEY;
const BASE = 'https://newsdata.io/api/1';
const CATEGORY_MAP = {
technology: 'technology',
business: 'business',
sports: 'sports',
science: 'science',
entertainment: 'entertainment',
health: 'health',
world: 'top'
};
async function fetchTopHeadlines(category, country = 'us', size = 10) {
if (!API_KEY) return [];
const cat = CATEGORY_MAP[category] || 'top';
try {
const { data } = await axios.get(`${BASE}/latest`, {
params: { apikey: API_KEY, category: cat, country, size, language: 'en' },
timeout: 8000
});
if (data.status !== 'success') return [];
return (data.results || []).map(a => ({
title: a.title,
description: a.description,
content: a.content,
url: a.link,
urlToImage: a.image_url,
publishedAt: a.pubDate,
source: a.source_name || '',
author: Array.isArray(a.creator) ? a.creator[0] || '' : '',
category: a.category?.[0] || cat
}));
} catch (err) {
console.error(`[newsdata] fetchTopHeadlines error: ${err.message}`);
return [];
}
}
async function searchEverything(query, size = 20) {
if (!API_KEY) return [];
try {
const { data } = await axios.get(`${BASE}/latest`, {
params: { apikey: API_KEY, q: query, size, language: 'en' },
timeout: 8000
});
if (data.status !== 'success') return [];
return (data.results || []).map(a => ({
title: a.title,
description: a.description,
content: a.content,
url: a.link,
urlToImage: a.image_url,
publishedAt: a.pubDate,
source: a.source_name || '',
author: Array.isArray(a.creator) ? a.creator[0] || '' : '',
category: a.category?.[0] || 'general'
}));
} catch (err) {
console.error(`[newsdata] searchEverything error: ${err.message}`);
return [];
}
}
module.exports = { fetchTopHeadlines, searchEverything, name: 'newsdata' };
