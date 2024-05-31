const express = require('express');
const {renderManageMain, renderManageDept} = require('../controllers/manage');

const router = express.Router();

// GET /manage
router.get('/', renderManageMain);

// GET /manage/:dept
// router.get('/:dept', renderManageDept);

module.exports = router;