const {DataTypes } = require('sequelize')


function model(sequelize){
const attributes = {
  restaurantId:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  restaurantName:{
    type: DataTypes.INTEGER,
  },
  number:{
    type: DataTypes.INTEGER,
  },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue:false
  }
}
  return sequelize.define('restaurant',attributes)
}

module.exports = model
