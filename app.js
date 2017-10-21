//Setting up Express
var express = require('express'); //Bring in Express
var app = express(); // Fire Express
var port = process.env.PORT || 3000; //Set a port for the app to listen on

//Require Modules
var session = require('express-session');
var morgan = require('morgan'); // Logs output to the console during development
var mongoose = require('mongoose'); // Mongo DB connection manager
var bodyParser = require('body-parser'); //Body Parser is sued to grab content from url form feild via POST requests
var passport = require('passport');  //
var MongoStore = require('connect-mongo')(session); //MongoStore is a session manager
//const path = require('path'); // Helps resolve paths, is used for pointing to the views folder as that is not the default location.

//Configure the MongoDB conntection
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport); //Passport is our authentication startegy

//Use Statements
app.use(morgan('dev')); //Morgan is allow us to monitor server communications for development purposes
app.use(express.static('bin')) //Configuring the Static folders
app.use(bodyParser.urlencoded({extended: false})); //Enables BodyParser to grab content from HTML pages and forms
//app.set('views', PATH.resolve(__dirname, 'app/views'));

//Configure Express Session
app.use(session({secret: 'anystringoftext',
saveUninitialized: true,
resave: true,
store: new MongoStore({ 
    mongooseConnection: mongoose.connection,
    ttl: 2 * 24 * 60 * 60 }) //ttl is the time to expire setting for a session, in seconds, times by minutes then hours then days.
}));

//Configure Passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session

//Set Statements
app.set('view engine', 'ejs');//Setting up the EJS view engine

//Creates the Routes
const openRoutes = require('./app/controllers/openroutes');
app.use(['', '/', '/home', '/about', 'services', '/contact'], openRoutes);

// var auth = express.Router();
// require('./app/routes/auth.js')(auth);
// app.use('/auth', auth);

// var secure = express.Router();
// require('./app/routes/secure.js')(secure);
// app.use('/', secure);

//Start the Server
app.listen(port);
console.log('Server running on port: ' + port);