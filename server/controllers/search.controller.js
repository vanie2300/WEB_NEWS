const newsService = require('../services/newsService');
async function search(req, res, next) {
try {
const { q } = req.query;
if (!q || !q.trim()) return res.status(400).json({ error: 'Query parameter q is required' });
const results = await newsService.searchArticles(q);
res.json({ query: q, results });
} catch (err) {
next(err);
}
}
module.exports = { search };
