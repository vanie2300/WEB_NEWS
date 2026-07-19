function deduplicate(articles) {
const seen = new Map();
for (const article of articles) {
const key = article.title
.toLowerCase()
.replace(/[^a-z0-9]/g, '')
.slice(0, 80);
if (!seen.has(key)) {
seen.set(key, article);
}
}
return Array.from(seen.values());
}
function removeIncomplete(articles) {
return articles.filter(a => a.title && a.title.trim().length > 0);
}
module.exports = { deduplicate, removeIncomplete };
