var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');


var routes = require('./routes/index');
mongoose.connect('localhost:27017/stockapp');

var app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'stockRouter',
  resave: false,
  saveUnintialized: false,
  cookie: {secure: false,
  maxAge: 180 * 60 * 1000}
}));
app.use(express.static(path.join(__dirname + '/public')));

app.use('/', routes);


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + 'press Ctrl-C to terminate');
});

module.exports = app;
