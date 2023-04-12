const {DataTypes } = require('sequelize')


function model(sequelize){
const attributes = {
  userId:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  firstname:{
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname:{
    type: DataTypes.STRING,
    allowNull: false
  },
  username:{
    type: DataTypes.STRING,
    allowNull: true
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  restaurantId:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  branchId:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  roles:{
    type:DataTypes.ENUM,
    values:['admin','owner','manager','salesperson']
  },
  status:{
    type:DataTypes.ENUM,
    values:['active','inactive']
  },
  refreshToken:{
    type:DataTypes.STRING,
    allowNull:true,
    defaultValue:null
  }
}
  return sequelize.define('user',attributes)
}

module.exports = model
