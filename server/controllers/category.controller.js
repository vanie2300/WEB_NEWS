const newsService = require('../services/newsService');
async function getCategory(req, res, next) {
try {
const { name } = req.params;
if (!newsService.VALID_CATEGORIES.includes(name)) {
return res.status(400).json({ error: `Invalid category: ${name}. Valid: ${newsService.VALID_CATEGORIES.join(', ')}` });
}
const articles = await newsService.fetchCategory(name);
res.json({ category: name, articles });
} catch (err) {
next(err);
}
}
module.exports = { getCategory };
