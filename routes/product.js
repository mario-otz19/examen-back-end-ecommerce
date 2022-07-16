const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldsValidator, /* isAdminRole, */ jwtValidator } = require('../middlewares');
const { createProduct, deleteProductByID, getProductByID, getProducts, updateProduct } = require('../controllers');

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'El ID no es válido.').isMongoId(),
    fieldsValidator
], getProductByID);

router.post('/', [
    jwtValidator,
    check('name', 'El nombre del producto es obligatorio.').not().isEmpty(),
    check('category', 'El ID no es válido.').isMongoId(),
    check('category', 'La categoría del producto es obligatoria.').not().isEmpty(),
    fieldsValidator    
], createProduct);

router.put('/:id', [
    check('category', 'El ID no es válido.').isMongoId(),
    jwtValidator,
    fieldsValidator
], updateProduct);

router.delete('/:id', [
    jwtValidator,
    // isAdminRole,
    check('id', 'El ID no es válido.').isMongoId(),
    fieldsValidator
], deleteProductByID);

module.exports = router;