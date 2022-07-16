const { Router } = require('express');
const { createRecord, deleteRecord, getRecords, getRecordByID, updateRecord } = require('../controllers');

const router = Router();

router.get('/', getRecords);

router.get('/:id',  getRecordByID);

router.post('/', createRecord);

router.put('/:id', updateRecord);

router.delete('/:id', deleteRecord);

module.exports = router;