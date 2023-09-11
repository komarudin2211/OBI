const db = require("../../config/mongo_db");
const Sequelize = require('sequelize');

const WTQ1 = async () => {
    try{

        let WTQ1 = await db.define('WTQ1', {
            DocDate: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            DocEntry:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            LineNum:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            Dscription:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            ItemCode:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            ShipDate:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });

        WTQ1.removeAttribute('id');

        return WTQ1;

    }catch(err){
        console.log(err.message);
    }
}
    

module.exports = WTQ1;