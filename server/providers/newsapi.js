const axios = require('axios');
const API_KEY = process.env.NEWS_API_KEY;
const BASE = 'https://newsapi.org/v2';
const CATEGORY_MAP = {
technology: 'technology',
business: 'business',
sports: 'sports',
science: 'science',
entertainment: 'entertainment',
health: 'health',
world: 'general'
};
async function fetchTopHeadlines(category, country = 'us', pageSize = 10) {
if (!API_KEY) return [];
const cat = CATEGORY_MAP[category] || 'general';
try {
const { data } = await axios.get(`${BASE}/top-headlines`, {
params: { apiKey: API_KEY, country, category: cat, pageSize },
timeout: 8000
});
if (data.status !== 'ok') return [];
return (data.articles || []).map(a => ({
title: a.title,
description: a.description,
content: a.content,
url: a.url,
urlToImage: a.urlToImage,
publishedAt: a.publishedAt,
source: a.source?.name || '',
author: a.author || '',
category: cat
}));
} catch (err) {
console.error(`[newsapi] fetchTopHeadlines error: ${err.message}`);
return [];
}
}
async function searchEverything(query, pageSize = 20) {
if (!API_KEY) return [];
try {
const { data } = await axios.get(`${BASE}/everything`, {
params: { apiKey: API_KEY, q: query, language: 'en', sortBy: 'publishedAt', pageSize },
timeout: 8000
});
if (data.status !== 'ok') return [];
return (data.articles || []).map(a => ({
title: a.title,
description: a.description,
content: a.content,
url: a.url,
urlToImage: a.urlToImage,
publishedAt: a.publishedAt,
source: a.source?.name || '',
author: a.author || '',
category: 'general'
}));
} catch (err) {
console.error(`[newsapi] searchEverything error: ${err.message}`);
return [];
}
}
module.exports = { fetchTopHeadlines, searchEverything, name: 'newsapi' };
