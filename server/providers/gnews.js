const axios = require('axios');
const API_KEY = process.env.GNEWS_API_KEY;
const BASE = 'https://gnews.io/api/v4';
const CATEGORY_MAP = {
technology: 'technology',
business: 'business',
sports: 'sports',
science: 'science',
entertainment: 'entertainment',
health: 'health',
world: 'world'
};
async function fetchTopHeadlines(category, country = 'us', max = 10) {
if (!API_KEY) return [];
const cat = CATEGORY_MAP[category] || 'general';
try {
const { data } = await axios.get(`${BASE}/top-headlines`, {
params: { category: cat, lang: 'en', country, max, apikey: API_KEY },
timeout: 8000
});
return (data.articles || []).map(a => ({
title: a.title,
description: a.description,
content: a.content,
url: a.url,
urlToImage: a.image,
publishedAt: a.publishedAt,
source: a.source?.name || '',
author: '',
category: cat
}));
} catch (err) {
console.error(`[gnews] fetchTopHeadlines error: ${err.message}`);
return [];
}
}
async function searchEverything(query, max = 20) {
if (!API_KEY) return [];
try {
const { data } = await axios.get(`${BASE}/search`, {
params: { q: query, lang: 'en', max, sortby: 'publishedAt', apikey: API_KEY },
timeout: 8000
});
return (data.articles || []).map(a => ({
title: a.title,
description: a.description,
content: a.content,
url: a.url,
urlToImage: a.image,
publishedAt: a.publishedAt,
source: a.source?.name || '',
author: '',
category: 'general'
}));
} catch (err) {
console.error(`[gnews] searchEverything error: ${err.message}`);
return [];
}
}
module.exports = { fetchTopHeadlines, searchEverything, name: 'gnews' };
