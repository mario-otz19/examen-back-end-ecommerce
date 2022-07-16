const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

// Quitar valores que no se quieren mostrar
// ProductSchema.methods.toJSON = function() {
//     const { __v, state, ...data } = this.toObject();

//     return data;
// }

module.exports = model('Test', ProductSchema);