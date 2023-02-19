require('dotenv').config();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  try{
    if(process.env.NODE_ENV == 'PRODUCTION'){
      await mongoose.connect(process.env.DB_HOST);
    }
    else{
      await mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+process.env.DB_NAME);
    }

    console.log("================");
    console.log("koneksi berhasil");
    console.log("================");
    return "koneksi aman";
  }catch(e){
    console.log("e ", e);
    return e.message;
  }
}