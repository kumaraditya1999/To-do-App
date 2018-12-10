var session = require('express-session');
var url = require('url');
var Users = require('../models/user.model');


exports.home = function(req,res){
	console.log("here in home");
	console.log(req.session);
	//console.log(req.session.user);
	var user = req.session.user;
	res.render('profile.ejs',{username :user.username,notes: user.notes});
}

exports.checkAuthentic = function(req,res,next){
	if(req.session.username){
		next();
	}else{
		//res.redirect('/',{message : "please login or register first"});
		res.redirect(url.format({
				       pathname:"/",
				       query: {
				          "message": "please login or register first" }
				     }));
	}
}

exports.add = function(req,res){
	//console.log(req.body);
	var note = {
		title : req.body.title,
		description : req.body.description,
		priority : req.body.priority,
		time : req.body.time,
		data : req.body.data,
	}
	// title : String,
	// description : String,
	// priority : Number,
	// time : String,
	// date : String,

	var notes2 = req.session.user.notes;
	notes2.push(note);
	console.log(notes2);
	Users.findOneAndUpdate({username : req.session.username},{notes : notes2}).then(function(result){
		// result.notes.push(req.body);
		res.send(req.body);
		console.log(result);
	});
}
