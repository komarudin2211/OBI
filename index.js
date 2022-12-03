const express = require('express');
const mssql = require('mssql');
const app = express();
const path = require('path');
const port = process.env.PORT || 3500;

let db = require("./config/db");

const connect = async () => {

try{
    let sql  = await db();
    const result = await sql.query`select * from dbo.USR50;`;
    console.log("Jumlah data : ", result.recordset.length);
    
    }catch(err) {
        console.log("err ", err);
    }
}
//connect();

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

console.log("***************************************");
console.log("*** sistem running on port : ", port, " ***");
console.log("***************************************");

module.exports = app
