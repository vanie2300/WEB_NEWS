const newsService = require('../services/newsService');
async function getHome(req, res, next) {
try {
const data = await newsService.fetchHome();
res.json(data);
} catch (err) {
next(err);
}
}
module.exports = { getHome };
