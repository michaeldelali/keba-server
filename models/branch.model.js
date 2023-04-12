const {DataTypes } = require('sequelize')


function model(sequelize){
const attributes = {
  branchId:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  branchName:{
    type: DataTypes.STRING,
    allowNull: false
  },
  restaurantId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  address:{
    type: DataTypes.STRING,
    allowNull: false
  },
  openTime:{
    type:DataTypes.TIME,
  },
  closeTime:{
    type:DataTypes.TIME,
 },
  phone:{
    type:DataTypes.STRING,
  },
  logo:{
    type:DataTypes.STRING,
  },
  branchImage:{
    type:DataTypes.STRING,  
  },
    branchDescription:{
    type:DataTypes.STRING,
    },
    branchStatus:{
    type:DataTypes.BOOLEAN,
    defaultValue:true
    },
    branchRating:{
    type:DataTypes.INTEGER,
    defaultValue:5
    },
    branchReview:{ 
    type:DataTypes.STRING,
    }
}
  return sequelize.define('branch',attributes)
}

module.exports = model
