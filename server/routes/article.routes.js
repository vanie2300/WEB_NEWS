const { Router } = require('express');
const { getArticle } = require('../controllers/article.controller');
const router = Router();
router.get('/api/article', getArticle);
module.exports = router;
