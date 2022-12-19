
require('dotenv').config();

let data =[];

let init = async (query) => {

    if(process.env.OS_NODE == 'WINDOWS'){
        const sql = require("msnodesqlv8");

        const pool = new sql.Pool({
            connectionString: process.env.STRING_CONNECT
        })

        // pool.on('open', (options) => {
        //     console.log(`ready options = ${JSON.stringify(options, null, 4)}`)
        // })

        // pool.on('debug', msg => {
        //     console.log(`\t\t\t\t\t\t${new Date().toLocaleTimeString()} <pool.debug> ${msg}`)
        // })

        // pool.on('status', s => {
        //     console.log(`status = ${JSON.stringify(s, null, 4)}`)
        // })

        pool.on('error', e => {
            console.log(e)
        });

        return new Promise((resolve, reject) => {
            sql.query(process.env.STRING_CONNECT, query, (err, rows) => {
                if(err) {
                    return reject(err)
                }

                resolve(rows);
            })
        });

       // const connectionString = "server=WIN-1G5BO4FRUM4;Database=OBI_LIVE;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
    }else{console.log("else")
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
            var sql = require("mssql");
           let connect = await sql.connect(config);
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
}

module.exports = init;