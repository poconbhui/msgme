"use strict"

/*
 * Define general parameters
 */
var PORT = 2787;


/*
 * Import modules
 */
var express   = require("express");
var app       = express();
var libnotify = require("libnotify");


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

    if(message.match(/^[\w.,'!\- ]+$/)) {
        /* Shoot off message */
        libnotify.notify(message, {title:"Node-notify", time: 5});
    } else {
        /* Set error message */
        res.cookie(
            'error',
            "Message must contain only alphanumeric characters and [.,!-' ]"
        );
    }

    res.redirect('/');
});


/*
 * Boot express server
 */
app.listen(PORT);
console.log("Node-notify is running on port "+PORT);
