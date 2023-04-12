const {DataTypes } = require('sequelize')


function model(sequelize){
const attributes = {
  tableId:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  branchId:{
    type: DataTypes.INTEGER,
  },
  number:{
    type: DataTypes.INTEGER,
    unique:true
  },
  status:{
    type: DataTypes.ENUM,
    values: ['available', 'occupied', 'reserved'],
  }
}
  return sequelize.define('tableRoom',attributes)
}

module.exports = model
