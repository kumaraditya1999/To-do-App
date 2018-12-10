var session = require('express-session');
var url = require('url');
var Users = require('../models/user.model');


exports.home = function(req,res){
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
	var note = {
		title : req.body.title,
		description : req.body.description,
		priority : req.body.priority,
		time : req.body.time,
		data : req.body.data,
	}

	var notes2 = req.session.user.notes;
	notes2.push(note);
	Users.findOneAndUpdate({username : req.session.username},{notes : notes2}).then(function(result){
		// result.notes.push(req.body)
		var send = req.body;
		res.send(send);
		console.log(result);
	});
}

exports.delete = function(req,res){
	var notes2 = req.session.user.notes;
	notes2.splice(req.body.index,1);
	Users.findOneAndUpdate({username : req.session.username},{notes : notes2}).then(function(result){
		console.log(result);
		res.send("deleted");
	});
}

exports.modify = function(req,res){
	var note = {
		title : req.body.title,
		description : req.body.description,
		priority : req.body.priority,
		time : req.body.time,
		data : req.body.data,
	}
	var notes2 = req.session.user.notes;
	notes2[req.body.index] = note;
	Users.findOneAndUpdate({username : req.session.username},{notes : notes2}).then(function(result){
		console.log(result);

		res.send(req.body);
	});
}
