var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var sinhvien = require('./routes/sinhvien');

var login = require('./routes/login');

var notification = require('./routes/notification');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sinhVien', sinhvien);
app.use('/login', login);
app.use('/notification', notification);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/// connect MYSQL DB
//// SQL
var mysql      = require('mysql');
// var connectionMysqlDb = mysql.createConnection({
//   host     : '103.97.125.254',
//   user     : 'namstork_admin',
//   password : 'vietnam999999999',
//   database : 'namstork_Demo'
// });
// connectionMysqlDb.connect((err)=>{
//   if(err) {throw err;}
//   console.log("____CONNECTED MYSQL DB____");
// });
// global.connectionMysqlDb = connectionMysqlDb;


var connectionMysqlDb;
var db_config = {
  host     : '103.97.125.254',
  user     : 'namstork_admin',
  password : 'vietnam999999999',
  database : 'namstork_Demo'
}

function handleDisconnect() {
  connectionMysqlDb = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connectionMysqlDb.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }
    console.log("____CONNECTED MYSQL DB____");                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
   connectionMysqlDb.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });

global.connectionMysqlDb = connectionMysqlDb;
  
}

handleDisconnect();



module.exports = app;
