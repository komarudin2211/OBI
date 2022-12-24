
require('dotenv').config();

//if(process.env.OS_NODE == 'WINDOWS'){
    const Sequelize = require('sequelize');
    
    const db = new Sequelize({
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

    db.authenticate();

// }else{
//     var config = {
//         user: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         server: process.env.DB_HOST,
//         port:parseInt(process.env.PORT),
//         database:process.env.DB_NAME,
//         trustServerCertificate: true,
//         options:{
//             cryptoCredentialsDetails:{
//                 minVersion: 'TLSv1'
//             }
//         }
//     };


//     var sql = require("mssql");
//     await sql.connect(config);
//     console.log("========================");
//     console.log("koneksi database suskes");
//     console.log("========================");

//     return new Promise((resolve, reject) => {
//         const request = new sql.Request();

//         request.query(query, (err, result) => {
//             if(err){
//                 return reject(err);
//             }
//             resolve(result.recordset);
//         });
//     });
// }

module.exports = db