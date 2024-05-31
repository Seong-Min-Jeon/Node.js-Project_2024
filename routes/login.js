const express = require('express');
const {renderLogin, renderJoin} = require('../controllers/login');

const router = express.Router();

// GET /login
router.get('/', renderLogin);

// GET /login/join
router.get('/join', renderJoin);

module.exports = router;