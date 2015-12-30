// server.js
require('babel-core/register')({
    presets: ['es2015', 'react']
});
// BASE SETUP
//===========================================
const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;


//var babel = require("babel-core");
var React = require('react');
var ReactDOM = require('react-dom/server');
var components = require('./public/components.js');

var HelloMessage = React.createFactory(components.HelloMessage)

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

//app.engine('handlebars', exphbs({defaultLayout: 'main'}));
//app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'))


// ROUTES
//===========================================
var router = express.Router();

router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});


router.get('/', function (req, res) {
    var pageData = {
		serverHtml: ReactDOM.renderToString(HelloMessage({name: "John"}))
	};
	
	res.render('index', pageData);
	//res.render('home', pageData);    
	
});


app.use('/', router);

// START THE SERVER
//===========================================
app.listen(port, function () {
    console.log("Listening on " + port);
});