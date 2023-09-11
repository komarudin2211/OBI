
require('dotenv').config();

const Sequelize = require('sequelize');
let db = {};

if(process.env.OS_NODE == 'WINDOWS'){
    db = new Sequelize({
        dialect: 'mssql',
        dialectModulePath: 'msnodesqlv8/lib/sequelize',
        dialectOptions: {
            user: '',
            password: '',
            database: 'OBI_LIVE',
            options: {
                driver: '',
                connectionString:process.env.STRING_CONNECT,
                trustedConnection: true,
                instanceName: ''
            }
        },
        pool: {
            min: 0,
            max: 5,
            idle: 10000
        }
    });
 }else{

    db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        dialect: 'mssql',
        host:  process.env.DB_HOST,
        port: 1433,  // disable logging; default: console.log
        dialectOptions: {
            requestTimeout: 30000 // timeout = 30 seconds
        }, pool: {
            min: 0,
            max: 5,
            idle: 10000
        }
    });
}

async function connect() {
    try {
       
        await db.authenticate();
        console.log("=========================");
        console.log("koneksi database berhasil");
        console.log("=========================");
    }
    catch(err){
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("koneksi database gagal : ",err.message);
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx");
    }
}

connect();

module.exports = db