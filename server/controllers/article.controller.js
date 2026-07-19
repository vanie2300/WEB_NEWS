const newsService = require('../services/newsService');
async function getArticle(req, res, next) {
try {
const { url } = req.query;
if (!url) return res.status(400).json({ error: 'url parameter required' });
const article = await newsService.getArticle(url);
res.json(article || { error: 'Article lookup by URL is not supported. Use the search endpoint instead.' });
} catch (err) {
next(err);
}
}
module.exports = { getArticle };
