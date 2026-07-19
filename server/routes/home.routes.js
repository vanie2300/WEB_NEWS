const { Router } = require('express');
const { getHome } = require('../controllers/home.controller');
const router = Router();
router.get('/api/home', getHome);
module.exports = router;
