var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');

var passport = require('passport');
const corsOptions = require('./config/corsOptions');
require('dotenv').config()

// Passport Config
require('./auth/auth')

// Middleware Exports
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');

// Routes Exports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');
var loginRouter = require('./routes/login')
var logoutRouter = require('./routes/logout')
var signupRouter = require('./routes/signup')
var refreshRouter = require('./routes/refresh')
var menuRouter = require('./routes/menu')
var orderRouter = require('./routes/orders')
var tableRouter = require('./routes/table')
var branchRouter = require('./routes/branch')
var customerRouter = require('./routes/customer')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(credentials)
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
// app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }))

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define Port
// const port = process.env.PORT || 3000
// app.listen(port, () => {
//   console.log(`Server is up at port:${port}`)
// })

// User Routes
app.use('/', indexRouter);
app.use('/login',loginRouter)
app.use('/logout',logoutRouter)
app.use('/signup',signupRouter)
app.use('/refresh',refreshRouter)
app.use('/customer',customerRouter)

// app.use('/profile',passport.authenticate('jwt',{session:false}),profileRouter);

// Protected Routes
app.use(verifyJWT)
app.use('/users', usersRouter);
app.use('/profile',profileRouter);
app.use('/menu',menuRouter);
app.use('/orders',orderRouter)
app.use('/tables',tableRouter)
app.use('/branch',branchRouter)

// Error Handler for 404
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.ejs'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

// global error handler
app.use(errorHandler);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
