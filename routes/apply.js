const express = require('express');
const {renderApplyMain, renderApplyPost, renderApplyPut, 
        postApplication, deleteApp, updateApp} = require('../controllers/apply');

const router = express.Router();

// GET /apply
router.get('/', renderApplyMain);

// GET /apply/post/:deptId
router.get('/post/:deptId', renderApplyPost);

// GET /apply/put/:id
router.get('/put/:id', renderApplyPut);

// POST /apply/post/:deptId
router.post('/post/:deptId', postApplication);

// DELETE /apply/delete/:id
router.delete('/delete/:id', deleteApp);

// PUT /apply/put/:id
router.put('/put/:id', updateApp);

module.exports = router;