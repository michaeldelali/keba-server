const bcrypt = require('bcrypt')
const db = require('../models/db')

const handleSignup = async(req, res, next) => {
        const { firstname, lastname, username, email, password,restaurantId,branchId,employeeId, role, refresh_token } = req.body;

        const salt = bcrypt.genSaltSync(10);
        let hashOut = bcrypt.hashSync(password, salt);
      
        const newUser = {
          firstname,
          lastname,
          email,
          username,
          restaurantId,
          branchId,
          employeeId,
          refresh_token,
          role,
          password: hashOut
        };
      
        try {
          await db.User.create(newUser)
          res.json({msg: "user registed"});
        } catch (error) {
            console.log(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
              res.status(400)
              res.send({ status: 'error', message: "User already exists"});
          } else {
              res.status(500)
              res.send({ status: 'error', message: "Something went wrong"});
          }
        }
      }
module.exports = {handleSignup};
