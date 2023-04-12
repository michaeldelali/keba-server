const { DataTypes } = require('sequelize')


function model(sequelize){
const attributes = {
    paymentId: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    paymentName: { type: DataTypes.STRING, unique: true},
    branchId: { type: DataTypes.INTEGER, allowNull: false},
    }
return sequelize.define('payment', attributes)
}

module.exports = model