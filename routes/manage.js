const express = require('express');
const {renderManageMain, renderManagePost, renderManagePut, 
    postDeptList, deleteDept, updateDept} = require('../controllers/manage');

const router = express.Router();

// GET /manage
router.get('/', renderManageMain);

// GET /manage/post
router.get('/post', renderManagePost);

// GET /manage/put/:id
router.get('/put/:id', renderManagePut);

// POST /manage/post
router.post('/post', postDeptList);

// DELETE /manage/delete/:id
router.delete('/delete/:id', deleteDept);

// PUT /manage/put/:id
router.put('/put/:id', updateDept);

module.exports = router;