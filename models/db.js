const config = require('../config/db')
const mysql = require('mysql2/promise')
const { Sequelize } = require('sequelize')

module.exports = db = {}

initialize()

async function initialize() {
   

    try {
        const { host, port, user, password, database } = config.database
        const connection = await mysql.createConnection({ host, port, user, password })
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
        
        const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' })
        db.User = require('./user.model')(sequelize)
        db.Restaurant = require('./restaurant.model')(sequelize)
        db.Branch = require('./branch.model')(sequelize)
        db.Menu = require('./menu.model')(sequelize)
        db.Category = require('./categories.model')(sequelize)
        db.Order = require('./orders.model')(sequelize)
        db.Table = require('./tableRoom.model')(sequelize)
        db.Payment = require('./payment.model')(sequelize)
      
        
        // await sequelize.sync({alter:true})
        await sequelize.sync()
        // Test Connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}