var express = require('express');
var app = express();
var fs = require('fs');
var morgan = require('morgan');
var winston = require('winston');
var compression = require('compression');
var path = require('path');
//Parsing urlencoded content
var bodyParser = require('body-parser');


var oneDay = 86400000;
global.__base = __dirname + '/';

app.use(bodyParser.urlencoded({
	extended: true
}));

//Logging system
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {
	flags: 'a'
});
// setup the access logger
app.use(morgan('combined', {
	stream: accessLogStream
}));
//Setup the error logger
winston.add(winston.transports.DailyRotateFile, {
	filename: __dirname + '/logs/error.log'
});

app.set('port', 4000);


app.use(express.static(path.join(__dirname, 'public'), {
	maxAge: oneDay
}));

//Add content compression middleware
app.use(compression());

//Models
require('./lib/model/')();

//App routing
require('./lib/route/')(app);

//Templating system
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
	var cluster = require('cluster');
	next();
});

require('http').createServer(app).listen(app.get('port'), function() {
	console.log('server started on port ' + app.get('port'));
});
