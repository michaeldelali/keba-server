const {DataTypes } = require('sequelize')


function model(sequelize){
const attributes = {
  orderId:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  restaurantId:{
    type: DataTypes.INTEGER,
  },
  tableId:{
    type: DataTypes.INTEGER,
  },
  userId:{
    type: DataTypes.INTEGER,
  },
  branchId:{
    type: DataTypes.INTEGER,
  },
  menuList:{
    type: DataTypes.JSON,
  },
 total:{
    type: DataTypes.INTEGER,
    },
    addons:{
        type: DataTypes.JSON,
    },
    note:{
        type: DataTypes.STRING,
    },
    paymentId:{
        type: DataTypes.INTEGER,
    },
    paymentMode:{
    type: DataTypes.STRING,
    },

  status:{
    type: DataTypes.ENUM,
    values: ['pending', 'processing', 'cancelled', 'completed']
  }
}
  return sequelize.define('orders',attributes)
}

module.exports = model
