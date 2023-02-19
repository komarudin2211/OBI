require('dotenv').config();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  try{
    var koneksi = await mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+process.env.DB_NAME);
    console.log("================");
    console.log("koneksi berhasil");
    console.log("================");
    return "koneksi aman";
  }catch(e){
    console.log("e ", e);
    return e.message;
  }
}