const router = require('express').Router()
const db = require('../models/db')
const jwt = require('jsonwebtoken')

/* get refresh Token */
const getTokenHandler = async (req,res)=>{
    try {
        const cookies = req.cookies;
        if (!cookies?.refreshToken) return res.sendStatus(401);
        const refreshToken = cookies.refreshToken
        const foundUser = await db.User.findOne({
            where:{
                refreshToken: refreshToken
            }
        });
        if(!foundUser) return res.sendStatus(403);
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

            if (foundUser.roles === 'owner') {roles = [1,2,3,4];}
            else if (foundUser.roles === 'admin') {roles = [2,3,4];}
            else if (foundUser.roles === 'manager') {roles = [3,4];}
            else if (foundUser.roles === 'salesperson') {roles = [4];}
            else {roles = [4];}
            
            console.log("ROLES::",roles)
            const publicBody = { 
              'userInfo': {
                'userId': foundUser.userId,
                'email': foundUser.email,
                'firstName': foundUser.firstName,
                'lastName': foundUser.lastName,
                'roles': foundUser.roles
            } }
            // const accessToken = jwt.sign({ user: body }, process.env.JWT_SECRET);

            // return res.json({ token });

            const accessToken = jwt.sign(publicBody, process.env.ACCESS_TOKEN_SECRET,{
              expiresIn: '1d'
            });

            const userObj = {
                userId: foundUser.userId,
                email: foundUser.email,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                roles: roles,
                branchId: foundUser.branchId,
                accessToken: accessToken,
                restaurantId: foundUser.restaurantId
              }

            console.log("New Access Token",accessToken)
            res.json(userObj);
        });
    } catch (error) {
        console.log(error);
    }
}

const verifyToken = async (req,res)=> {
    try {
        const refreshToken = req.cookies.refreshToken;

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.json({state:false});
            res.json({state:true});
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {verifyToken,getTokenHandler}