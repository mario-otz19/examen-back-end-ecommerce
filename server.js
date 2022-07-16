const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { dbNoSQLConnection, /* dbSQLConnection */ } = require('./config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            // test: '/api/v1/test', 
            // test2: '/api/v1/test2',
            auth: '/api/v1/auth',
            categories: '/api/v1/categories',
            products: '/api/v1/products',
            // search: '/api/v1/search',
            uploads: '/api/v1/uploads',
            users: '/api/v1/users',
        }

        // this.connectDBSQL();
        this.connectDBNoSQL();
        this.middlewares();
        this.routes();
    }

    connectDBSQL() {  
        dbSQLConnection.sync()
            .then(() => {
                console.log('¡Conectado a la base de datos PostgreSQL! :v')
                console.log(`Última actualización: ${ (JSON.stringify(new Date().toLocaleString())).replace(/\"/g, '') }`);
            })
            .catch((error) => {
                console.log('Error al conectar con base de datos PostgreSQL ')
                console.log('Error: ', error)
            });
    }
    
    async connectDBNoSQL() {
        await dbNoSQLConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(fileUpload({
            createParentPath: true,
            tempFileDir : '/tmp/',
            useTempFiles : true
        }));        
    }

    routes() {
        // this.app.use(this.paths.test, require('./routes/test')); 
        // this.app.use(this.paths.test2, require('./routes/test2'));
        this.app.use(this.paths.auth, require('./routes/auth'));
        this.app.use(this.paths.categories, require('./routes/category'));
        this.app.use(this.paths.products, require('./routes/product'));
        // this.app.use(this.paths.search, require('../routes/searches'));
        this.app.use(this.paths.uploads, require('./routes/upload'));
        this.app.use(this.paths.users, require('./routes/user'));
    }

    listen() {
        this.app.listen(+this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${ this.port }`);
            console.log(`Última actualización: ${ (JSON.stringify(new Date().toLocaleString())).replace(/\"/g, '') }`);
        });        
    }
}

module.exports = Server;