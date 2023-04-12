const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { object } = require('joi');

const handleLogin = async(req,res,next)=>{
    passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            console.log("INFO::",info)
            if (err) {
              const error = new Error(info.message);
              return next(error);
            }
            if (!user) {
              return res.status(401).json({ message: info.message });
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
                // const roles = Object.values(user.roles).filter(Boolean);
                if (user.roles === 'owner') {roles = [1,2,3,4];}
                else if (user.roles === 'admin') {roles = [2,3,4];}
                else if (user.roles === 'manager') {roles = [3,4];}
                else if (user.roles === 'salesperson') {roles = [4];}
                else {roles = [4];}
                
                console.log("ROLES::",roles)
                const publicBody = { 
                  'userInfo': {
                    'userId': user.userId,
                    'email': user.email,
                    'firstName': user.firstName,
                    'lastName': user.lastName,
                    'roles': user.roles
                } }
                const body = { id: user.userId, email: user.email };
                // const accessToken = jwt.sign({ user: body }, process.env.JWT_SECRET);
  
                // return res.json({ token });
  
                const accessToken = jwt.sign(publicBody, process.env.ACCESS_TOKEN_SECRET,{
                  expiresIn: '1d'
                });
                const refreshToken = jwt.sign(body, process.env.REFRESH_TOKEN_SECRET,{
                  expiresIn: '1d'
                });
                await db.User.update({refreshToken: refreshToken},{
                  where:{
                    userId: user.userId
                  }
                });
                res.cookie('refreshToken', refreshToken,{
                  httpOnly: true,
                  maxAge: 24 * 60 * 60 * 1000
                });
                const userObj = {
                  userId: user.userId,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  roles: roles,
                  branchId: user.branchId,
                  accessToken: accessToken,
                  restaurantId: user.restaurantId
                }
                res.json(userObj);
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
}

module.exports = {handleLogin};