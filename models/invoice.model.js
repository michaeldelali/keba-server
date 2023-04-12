const {DataTypes } = require('sequelize')

function model(sequelize){
const attributes = {
  userId:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  invoiceId:{
    type: DataTypes.STRING,
    allowNull: false
  },
  status:{
    type: DataTypes.STRING,
    defaultValue:"pending"
  },
}
  return sequelize.define('invoice',attributes)
}

module.exports = model