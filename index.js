var express = require('express');
var app = express();
var fs = require('fs');
var morgan = require('morgan');
var winston = require('winston');
var compression = require('compression');
var sticky = require('sticky-session');

//Parsing urlencoded content
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));
global.__base = __dirname + '/';

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

var path = require('path');
var oneDay = 86400000;
app.use(express.static(path.join(__dirname, 'public'), {
	maxAge: oneDay
}));

//Add content compression middleware
app.use(compression());


//Connect to database
//mongoose.connect('mongodb://localhost/goroadtrip');

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



function startServer() {
	var server = sticky(require('http').createServer(app));
	server.listen(app.get('port'), function() {
		console.log('server started');
	});
}

sticky(function() {
	var server = require('http').createServer(app);
	return server;
}).listen(app.get('port'), function() {
	console.log('server started');
});