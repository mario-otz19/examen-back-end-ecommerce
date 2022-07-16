const ADMIN = 'ADMIN_ROLE';

const CODE_200 = 200;
const CODE_201 = 201;
const CODE_400 = 400;
const CODE_401 = 401;
const CODE_403 = 403;
const CODE_404 = 404;
const CODE_500 = 500;

const OK = 'Operación exitosa.';
const CREATED = 'La solicitud ha tenido éxito y se ha creado un nuevo recurso.';
const BAD_REQUEST = 'El servidor no pudo interpretar la solicitud dada una sintaxis inválida.';
const FORBIDDEN = 'Permisos insuficientes.';
const NOT_FOUND = 'No se pudo encontrar el recurso solicitado.';
const INTERNAL_SERVER_ERROR = 'Error interno de servidor.';

const MSG_CATEGORY_CREATED = 'Se ha creado una nueva categoría.';
const MSG_CATEGORY_DELETED = 'Se ha eliminado la categoría.';
const MSG_CATEGORY_EXISTS = 'La categoría que desea agregar ya existe.';
const MSG_CATEGORY_NOT_FOUND = 'No se ha encontrado la categoría.';
const MSG_CATEGORY_UPDATED = 'Categoría actualizada.';

const MSG_USER_BLOCKED = 'Usuario inactivo o bloqueado.';
const MSG_USER_CREATED = 'Se ha creado un nuevo usuario.';
const MSG_USER_DELETED = 'Se ha eliminado el usuario.';
const MSG_USER_NOT_FOUND = 'No se ha encontrado el usuario.';
const MSG_USER_UPDATED = 'Usuario actualizado.';
const MSG_USER_WRONG = 'El usuario o contraseña no son correctos.';

const MSG_PRODUCT_CREATED = 'Se ha creado un nuevo producto.';
const MSG_PRODUCT_DELETED = 'Se ha eliminado el producto.';
const MSG_PRODUCT_EXISTS = 'El producto que desea agregar ya existe.';
const MSG_PRODUCT_NOT_FOUND = 'No se ha encontrado el producto.';
const MSG_PRODUCT_UPDATED = 'Producto actualizado.';

const MSG_TOKEN_NOT_FOUND = 'No se ha encontrado token en la petición.';
const MSG_INVALID_TOKEN = 'Token no válido.';

module.exports = {
    ADMIN,
    CODE_200, CODE_201, CODE_400, CODE_401, CODE_403, CODE_404, CODE_500, OK,
    CREATED, BAD_REQUEST, FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR, 
    MSG_CATEGORY_CREATED, MSG_CATEGORY_DELETED, MSG_CATEGORY_EXISTS, MSG_CATEGORY_NOT_FOUND, MSG_CATEGORY_UPDATED, 
    MSG_USER_BLOCKED, MSG_USER_CREATED, MSG_USER_DELETED, MSG_USER_NOT_FOUND, MSG_USER_UPDATED, MSG_PRODUCT_CREATED, MSG_USER_WRONG,
    MSG_PRODUCT_DELETED, MSG_PRODUCT_EXISTS, MSG_PRODUCT_NOT_FOUND, MSG_PRODUCT_UPDATED,
    MSG_TOKEN_NOT_FOUND, MSG_INVALID_TOKEN
}