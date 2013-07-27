"use strict"

/*
 * Define general parameters
 */
var PORT = process.env.PORT || 27087;


/*
 * Import modules
 */
var http     = require("http");
var express  = require("express");
var app      = express();
var notify   = require("c-libnotify").notify;
var systemd  = require("systemd");
var autoquit = require("autoquit");


/*
 * Set express settings
 */
app.use(express.bodyParser());
app.use(express.cookieParser());

app.set('views', __dirname);
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(express.static(__dirname + '/assets'));


/*
 * Define routing
 */
app.get('/', function(req, res){
    var error = req.cookies.error;
    res.clearCookie('error');

    res.render("msgme.jade", {error:error});
});

app.post('/', function(req, res){
    var message = req.body.message;

    /* Shoot off message */
    notify(message, {title:"Node-notify"});

    res.redirect('/');
});


/*
 * Boot express server
 */
var server = http.createServer(app);
server.autoQuit({timeOut:10*60}); // Timeout after 10 minutes
server.listen(PORT);

console.log("Node-notify is running on port "+PORT);
