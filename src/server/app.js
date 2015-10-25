var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var webRoutes = require('./web/web');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

webRoutes(app);
// app.use(express.static('../client'));

var port = 3800;

app.listen(port, function(){
	console.log('this app is listening at localhost:' + port);
});