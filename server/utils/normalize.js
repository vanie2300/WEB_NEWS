const CATEGORY_MAP = {
technology: ['technology', 'tech', 'science_and_technology'],
business: ['business', 'money', 'economy', 'finance'],
sports: ['sports', 'sport'],
science: ['science', 'science_and_technology', 'environment'],
entertainment: ['entertainment', 'lifestyle', 'food', 'tourism'],
health: ['health', 'healthcare', 'medical'],
world: ['world', 'general', 'nation', 'politics']
};
const FALLBACK_IMAGE = 'https://picsum.photos/800/500';
function mapCategory(raw) {
if (!raw) return 'world';
if (Array.isArray(raw)) {
if (raw.length === 0) return 'world';
raw = raw[0];
}
const lower = raw.toLowerCase();
for (const [key, aliases] of Object.entries(CATEGORY_MAP)) {
if (aliases.some(a => lower.includes(a))) return key;
}
return 'world';
}
function normalize(article, source) {
return {
id: article.id || article.article_id || article.url || '',
title: article.title || '',
description: article.description || '',
content: article.content || '',
url: article.url || article.link || '',
image: article.image || article.urlToImage || article.image_url || FALLBACK_IMAGE,
publishedAt: article.publishedAt || article.published_at || article.pubDate || '',
source: (typeof article.source === 'string' ? article.source : article.source?.name) || article.source_name || source || '',
author: article.author || (Array.isArray(article.creator) ? article.creator[0] : article.creator) || '',
category: mapCategory(article.category || article.genre || ''),
provider: source
};
}
module.exports = { normalize, mapCategory, CATEGORY_MAP, FALLBACK_IMAGE };
