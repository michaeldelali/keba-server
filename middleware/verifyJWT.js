const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("AuthHEader:::",authHeader)
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
          if (err) return res.sendStatus(403); //invalid token
          req.user = decoded.userInfo.email;
          req.roles = decoded.userInfo.roles;
          next();
      }
  );

  // const authHeader = req.headers['authorization'];
  // console.log("AuthHEader:::",authHeader)
  // const authHeadertoken = authHeader && authHeader.split(' ')[1];
  // console.log("FORMATED TOKEN",authHeadertoken)

  // const token = 
  //     req.body.token ||
  //     req.query.token ||
  //     req.headers['x-access-token'] ||
  //     // req.cookies.refreshToken||
  //     authHeader;

  // // console.log("TOKEN ::::",token)
  
  // if (!token) {
  //   res.status(401).send('Unauthorized: No token provided');
  // } else {
  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user) {
  //     if (err) {
  //       res.status(403).send('Unauthorized: Invalid token');
  //     } else {
  //       req.user = user;
  //       res.json(req.user)
  //       next();
  //     }
  //   });
  // }
}

module.exports = verifyJWT;