const { Router } = require('express');
const { getCategory } = require('../controllers/category.controller');
const router = Router();
router.get('/api/category/:name', getCategory);
module.exports = router;
