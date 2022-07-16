const Auth = require('./auth');
const Category = require('./category');
const Product = require('./product');
// const Test = require('./test');
// const Test2 = require('./test2');
const Upload = require('./upload');
const User = require('./user');

module.exports = {
    ...Auth,
    ...Category,
    ...Product,
    // ...Test,
    // ...Test2,
    ...Upload,
    ...User
}