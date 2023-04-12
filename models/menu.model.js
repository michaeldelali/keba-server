const {DataTypes } = require('sequelize')


function model(sequelize){
const attributes = {
  menuId:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  image_url:{
    type: DataTypes.STRING,
    allowNull: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  quantity:{
    type: DataTypes.INTEGER,
    allowNull: false
    },
  description:{
    type: DataTypes.STRING,
    allowNull: true
  },
  price:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  category:{
    type:DataTypes.STRING,
    allowNull:false
  },
  view:{
    type:DataTypes.ENUM,
    values:['true','false'],
    allowNull:true
  },
  branchId:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  restaurantId:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  userId:{
    type:DataTypes.INTEGER,
    allowNull:false
  }
}
  return sequelize.define('menu',attributes)
}

module.exports = model
