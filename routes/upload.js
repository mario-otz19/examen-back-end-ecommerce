const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldsValidator, validateFileUpload } = require('../middlewares');
const { updateCloudinaryImage } = require('../controllers');

router.put('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    validateFileUpload,
    fieldsValidator
], updateCloudinaryImage);

module.exports = router;