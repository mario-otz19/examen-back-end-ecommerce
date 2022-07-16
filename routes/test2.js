const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares');
const { createRecord2, deleteRecord2, getRecords2, getRecordByID2, updateRecord2 } = require('../controllers');

const router = Router();

router.get('/', getRecords2);

router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], getRecordByID2);

router.post('/', createRecord2);

router.put('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], updateRecord2);

router.delete('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    fieldsValidator
], deleteRecord2);

module.exports = router;