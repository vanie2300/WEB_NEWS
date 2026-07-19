const { Router } = require('express');
const { search } = require('../controllers/search.controller');
const router = Router();
router.get('/api/search', search);
module.exports = router;
