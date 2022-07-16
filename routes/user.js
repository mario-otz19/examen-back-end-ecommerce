const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { emailExists, isValidRole, userExistsById } = require('../helpers/dbValidators');
const { fieldsValidator, /* hasRole, isAdminRole,*/ jwtValidator } = require('../middlewares');
const { addUser, deleteUserByID, getUsers, updateUser } = require('../controllers');

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 carácteres.').isLength({ min: 6 }),
    check('email', 'El correo electrónico no es válido.').isEmail(),
    check('email').custom( emailExists ),
    check('role').custom( isValidRole ),
    fieldsValidator
], addUser);    

router.put('/:id', [
    check('id', 'El ID no es válido.').isMongoId(),
    check('role').custom( isValidRole ),
    fieldsValidator
], updateUser);   

router.delete('/:id', [
    jwtValidator,
    // isAdminRole,
    check('id', 'El ID no es válido.').isMongoId(),
    fieldsValidator
], deleteUserByID);        

module.exports = router;