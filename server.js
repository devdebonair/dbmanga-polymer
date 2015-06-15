var express = require("express");
var app = express();
var session = require("express-session");
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo")(session);
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var logger = require('morgan');

var config = require("./config");
var passport = require("passport");


//Configure Express
console.log('Configuring Express....');
app.use(function(req, res, next) { 
    if(req.headers.host === 'dbmanga.com') 
    { 
        res.writeHead(303, {'Location': 'http://www.dbmanga.com' + req.url});
        res.end();
    }
    else
    {
        next();
    }
}); 
app.use(logger('dev'));
app.use( '/lib', express.static(__dirname + '/public/lib') );
app.use( '/elements', express.static(__dirname + '/public/elements'))
app.use( '/public', express.static(__dirname + '/public'));
app.use( cookieParser() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( methodOverride() );

//Initialize database
console.log('Connecting to Database....');
require("./database/db")(mongoose, function(err){
    if(!err)
    {
        app.use( session({
            secret: config.session.secret,
            store: new MongoStore({
                mongooseConnection: mongoose.connection
            }),
            saveUninitialized: true,
            resave: false
        }));
    }
    app.use( passport.initialize() );
    app.use( passport.session() );
    
    
    //Initialize Passport
    console.log('Checking Passport...');
    require("./passport")(passport);
    
    //Initialize Routes
    console.log('Establishing Routes....');
    require("./routes")(app, passport);
    
    app.get('*', function(req, res){
        res.status(404).json({"error": "route does not exist"});
    });
});

console.log('Starting Server....');
app.listen( config.env.port, function(){
    console.log('Listening to port:\t%s', config.env.port );
});