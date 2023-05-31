const { DataTypes } = require('sequelize')

// restaurantId: '',
// branchId: '',
// name: "",
// address: "",
// openTime: "",
// closeTime: "",
// openDays: "",
// phone: "",
// logo: "",
// image: "",
// paymentMethods:[],
// tableNumber: ''

function model(sequelize) {
  const attributes = {
    branchId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
    },
    openTime: {
      type: DataTypes.STRING,
    },
    openDays: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
    logoBlurHash: {
      type: DataTypes.STRING,
    },
    banner: {
      type: DataTypes.STRING,
    },
    bannerBlurHash: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['opened', 'closed']
    },
    paymentMethods: {
      type: DataTypes.JSON
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    review: {
      type: DataTypes.STRING,
    }
  }
  return sequelize.define('branch', attributes)
}

module.exports = model
