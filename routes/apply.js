const express = require('express');
const {renderApplyMain, renderApplyPost, postApplication} = require('../controllers/apply');

const router = express.Router();

// GET /apply
router.get('/', renderApplyMain);

// GET /apply/post/:deptId
router.get('/post/:deptId', renderApplyPost);

// POST /apply/:deptId
router.post('/post/:deptId', postApplication);

module.exports = router;