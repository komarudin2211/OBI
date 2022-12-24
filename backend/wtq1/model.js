let db = require("../../config/db");

const list = async() => {
    try{
        let sql  = await db;
     
        const result = await sql(`select DocDate, Quantity, ItemCode, Dscription, UomCode, ShipDate from dbo.WTQ1 ORDER BY DocDate DESC;`);
        return result;
    }catch(err){
        return err.message;
    }
   
}

module.exports.list = list;