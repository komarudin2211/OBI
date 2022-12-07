var sql = require("mssql");
require('dotenv').config();

let data =[];
let init = async () => {
    var config = {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST,
        port:parseInt(process.env.PORT),
        database:process.env.DB_NAME,
        trustServerCertificate: true,
        options:{
            cryptoCredentialsDetails:{
                minVersion: 'TLSv1'
            }
        }
    };

    try {
       let connect = await sql.connect(config);
     //  const result = await sql.query`select * from dbo.USR1`;
    //    data = result.recordset;
    //    console.log("Jumlah data : ", data.length)
        console.log("========================");
        console.log("koneksi database suskes");
        console.log("========================");

        return connect;
    }
    catch (err) {
        console.log("========================");
        console.log("koneksi database gagal");
        console.log(config);
        console.log("========================");

        console.log("**************************");
        console.log("error response : ", err.message)
        console.log("**************************");

    }
}

let conn = Promise.all([init()]).then((res) => res

    // let getUser = async () => {
    //     for(let i=0; i < data.length; i++) {
    //        let item = await new Promise(resolve => setTimeout(() => resolve(data[i]), 1000));
    //        console.log("==============");
    //        console.log(item);
    //        console.log("======="+i+"======="+item.ClientName);
    //     }
    // };

    // getUser();
).catch((err) => err);

module.exports = init;