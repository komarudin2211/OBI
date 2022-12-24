const db = require("../../config/db");
const Sequelize = require('sequelize');

const WTQ1 = async () => {
    try{

        let WTQ1 = await db.define('WTQ1', {
            DocDate: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            }
        }, {freezeTableName: true});

        return WTQ1;

    }catch(err){
        console.log(err.message);
    }
}
    

module.exports = WTQ1;