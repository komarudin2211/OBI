require('dotenv').config();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  try{
    if(process.env.NODE_ENV == 'Production'){
      await mongoose.connect(process.env.DB_HOST);
      var username = encodeURIComponent(process.env.DB_USERNAME);
      var password = encodeURIComponent(process.env.DB_PASSWORD);

      var connectionString = `mongodb://${username}:${password}@${process.env.DB_ENPOINT}:${process.env.DB_PORT}`;

      var databaseConnection = await mongoose.connect(connectionString, {
          ssl: true,
      });
    }
    else{
      let db = await mongoose.connect('mongodb://'+process.env.DB_HOST+'/'+process.env.DB_NAME);
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

module.exports = main