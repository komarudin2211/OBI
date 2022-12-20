let db = require("../../config/db");

const list = async() => {
    try{
        let sql  = await db;
     
        const result = await sql(`select top 100 * from dbo.WTQ1 ORDER BY DocDate DESC;`);
        return result;
    }catch(err){
        return err.message;
    }
   
}

module.exports.list = list;