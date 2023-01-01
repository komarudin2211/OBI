const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3500;
const wtq1= require("./backend/wtq1");
const obcd= require("./backend/obcd")
var bodyParser = require('body-parser');

// const connect = async () => {
//     try{
//         let sql  = await db
     
//         const result = await sql(`select * from dbo.WTQ1;`);
//         console.log(result.length);
       
//     }catch(err) {
//        console.log("err ", err);
//    }
// }
// connect();

// const sql = require("msnodesqlv8");

// const connectionString = "server=WIN-1G5BO4FRUM4;Database=OBI_LIVE;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
// const query = "SELECT * from dbo.WTQ1";
app.use(bodyParser.json());
app.use("/api", wtq1, obcd);

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

console.log("***************************************");
console.log("*** system running on port : ", port, " ***");
console.log("***************************************");

module.exports = app
