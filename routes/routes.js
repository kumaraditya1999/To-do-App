var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js');


router.get('/',function(req,res){
	res.render('todoview.ejs');
});

router.post('/register',function(req,res){
	console.log(req);
	var user = new User({
		firstname : req.body.firstname,
		lastname : req.body.lastname,
		email : req.body.email,
		username : req.body.username,
		password : req.body.password
	});

	user.save();
	
});

router.post('/login',function(req,res){
	console.log(req);
});

module.exports = router;