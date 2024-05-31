const express = require('express');
const {renderApplyMain, renderApplyDept} = require('../controllers/apply');

const router = express.Router();

// GET /apply
router.get('/', renderApplyMain);

// GET /apply/:dept
// router.get('/:dept', renderApplyDept);

module.exports = router;