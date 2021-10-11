var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var gameRouter = require('./routes/game');
var usersCreateRoom = require('./routes/room');

const app = express();
const session = require('express-session');
const flash = require('express-flash');

// Pertama, setting request body parser
// (Ingat! Body parser harus ditaruh paling atas)
app.use(express.urlencoded({ extended: false }));

// Kedua, setting session handler
app.use(
	session({
		secret: 'rahasia',
		resave: false,
		saveUninitialized: false
	})
);

// Ketiga, setting passport
// (sebelum router dan view engine)
const passport = require('./lib/passport');
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Keempat, setting flash
app.use(flash());

// Keenam, setting router
app.use('/', indexRouter);
app.use('/game', gameRouter);
app.use('/game/create-room', usersCreateRoom);

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

module.exports = app;
