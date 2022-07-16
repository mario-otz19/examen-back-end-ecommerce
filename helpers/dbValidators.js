const { Role, User } = require('../models');

const emailExists = async(email = '') => {
    const exists = await User.findOne({ email });

    if(exists) {
        throw new Error(`El correo: '${ email }' ya se encuentra registrado.`);     
    }
}

const isValidRole = async(role = '') => {
    const roleExists = await Role.findOne({ role });

    if(!roleExists) {
        throw new Error(`El rol: '${ role }' no es válido.`);
    }
}

// Validar colecciones permitidas
// const allowedCollections = async(collection = '', collections = []) => {
//     const collectionIncluded = collections.includes(collection);
    
//     if(!collectionIncluded) {
//         throw new Error(`La colección: '${ collection }' no está permitida, colecciones válidas: ${ collections }`);     
//     }

//     return true;
// }

module.exports = {
    emailExists,
    isValidRole
}