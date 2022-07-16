const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldsValidator, /* isAdminRole, */ jwtValidator } = require('../middlewares');
const { createCategory, deleteCategoryByID, getCategories, getCategoryByID, updateCategory } = require('../controllers');

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'El ID no es válido.').isMongoId(),
    fieldsValidator
], getCategoryByID);

router.post('/', [
    jwtValidator,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    fieldsValidator
], createCategory);

router.put('/:id', [
    jwtValidator,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    fieldsValidator
], updateCategory);

router.delete('/:id', [
    jwtValidator,
    // isAdminRole,
    check('id', 'El ID no es válido.').isMongoId(),
    fieldsValidator
], deleteCategoryByID);

module.exports = router;