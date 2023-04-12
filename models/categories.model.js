const {DataTypes } = require('sequelize')


function model(sequelize){
const attributes = {
  categoriesId:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    allowNull:true
  },
  branchId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category_name:{
    type: DataTypes.STRING,
    allowNull: false
  }
}
  return sequelize.define('categories',attributes)
}

module.exports = model
