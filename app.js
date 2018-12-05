var express = require('express');
var todoController = require('./todocontroller.js');


var app = express();

//set up the template engines

app.set('view engine','ejs');


app.use(express.static('./ToDoApp'));

todoController(app);


app.listen('3000',()=>{
	console.log("You are listening to port 3000");
});