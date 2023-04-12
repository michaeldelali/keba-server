const passport = require('passport');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db = require('../models/db');


passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await db.User.findOne({ where: { email: email }});
          console.log("USER Now::",user.password)
          console.log("MATCH::",password)
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          bcrypt.compare(password, user.password, function(err, result) {
            if(err) {
              return done(true, null, { message: 'An Error Occured' });
            }
            if (!result) {
              return done(null, null, { message: 'Incorrect Password' });
            }
            if(result) {
              return done(null, user, { message: 'Logged in Successfully' });
            }
          });


        //   return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['refreshToken'];
    }
    return token;
};

passport.use(new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.REFRESH_TOKEN_SECRET
  }, (jwtPayload, done) => {
    const { expiration } = jwtPayload
    if (Date.now() > expiration) {
        done('Unauthorized', false)
    }
    done(null, jwtPayload)
}))