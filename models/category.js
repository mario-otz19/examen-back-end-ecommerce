const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();

    return data;
}

module.exports = model('Category', CategorySchema);