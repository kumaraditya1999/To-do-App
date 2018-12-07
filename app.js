var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//declare the app
var app = express();


//connect to the data base
let dev_db_url = 'mongodb://aditya:aditya123@ds225624.mlab.com:25624/todoapp';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(dev_db_url);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.once('open',function(){
	console.log('you are connected');
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set up the template engines
app.set('view engine','ejs');
app.use(express.static('assets'));

//use the routes
var routes = require('./routes/routes');
var profile_routes = require('./routes/profile.routes')

app.use('/profile',profile_routes);
app.use('/',routes);


app.listen('3000',()=>{
	console.log("You are listening to port 3000");
});