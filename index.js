const express = require('express');
const mssql = require('mssql');
const app = express();
const path = require('path');
const port = process.env.PORT || 3500;

let db = require("./config/db");

//const connect = async () => {

//try{
//    let sql  = await db();
//  const result = await sql.query`select * from dbo.USR50;`;
//    console.log("Jumlah data : ", result.recordset.length);
//   
//    }catch(err) {
//        console.log("err ", err);
//    }
//}
//connect();

const sql = require("msnodesqlv8");

const connectionString = "server=WIN-1G5BO4FRUM4;Database=OBI_LIVE;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const query = "SELECT * from dbo.WTQ1";

sql.query(connectionString, query, (err, rows) => {
    console.log(rows);
    console.log("tugas kuliah: ", err);
});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

console.log("***************************************");
console.log("*** sistem running on port : ", port, " ***");
console.log("***************************************");

module.exports = app
