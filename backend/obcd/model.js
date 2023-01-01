const db = require("../../config/db");
const Sequelize = require('sequelize');

const OBCD = async () => {
    try{

        let OBCD = await db.define('OBCD', {
            BcdCode: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            BcdEntry:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            ItemCode: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            UomEntry: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            UpdateDate: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            }
        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });

        OBCD.removeAttribute('id');

        return OBCD;

    }catch(err){
        console.log(err.message);
    }
}
    

module.exports = OBCD;