const express = require('express');

const { isLoggedIn } = require('../authentication');
const { follow } = require('../controllers/user');

const router = express.Router();

// POST /user/:id/follow
// router.post('/:id/follow', isLoggedInUser, follow);

module.exports = router;
