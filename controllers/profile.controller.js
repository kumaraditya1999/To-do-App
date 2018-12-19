var session = require('express-session');
var url = require('url');
var Users = require('../models/user.model');


exports.home = function(req,res){
	//console.log(req.session.user);
	var user = req.session.user;
	res.render('profile.ejs',{username :user.username,notes: user.notes,meetings :user.meetings});
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
		date : req.body.date,
	}

	var notes2 = req.session.user.notes;
	notes2.push(note);
	Users.findOneAndUpdate({username : req.session.username},{notes : notes2}).then(function(result){
		// result.notes.push(req.body)
		var send = req.body;
		res.send(send);
	});
}

exports.delete = function(req,res){
	var notes2 = req.session.user.notes;
	notes2.splice(req.body.index,1);
	Users.findOneAndUpdate({username : req.session.username},{notes : notes2}).then(function(result){
		res.send("deleted");
	});
}

exports.modify = function(req,res){
	var note = {
		title : req.body.title,
		description : req.body.description,
		priority : req.body.priority,
		time : req.body.time,
		date : req.body.date,
	}
	var notes2 = req.session.user.notes;
	notes2[req.body.index] = note;
	Users.findOneAndUpdate({username : req.session.username},{notes : notes2}).then(function(result){

		res.send(req.body);
	});
}


//meetings part

exports.add_meeting = function(req,res){
	var meeting = {
	title : req.body.title,
	description : req.body.description,
	with : req.body.with,
	date : req.body.date,
	time : req.body.time,
	};
	var secondMeeting = {
	title : req.body.title,
	description : req.body.description,
	with : req.session.user.username,
	date : req.body.date,
	time : req.body.time,
	}
	var With = req.body.with;
	Users.findOne({username : With}).then(function(result){
		if(result){
			var meetings2 = result.meetings;
			meetings2.push(secondMeeting);
			Users.findOneAndUpdate({username : With},{meetings : meetings2}).then(function(result){
		// result.notes.push(req.body)
				// var send = req.body;
				// send.status = 1;
				// res.send(send);
				// console.log(result);
				var meetings2 = req.session.user.meetings;
				meetings2.push(meeting);
				Users.findOneAndUpdate({ username:req.session.user.username},{meetings : meetings2}).then(function(result){
					var send = req.body;
				send.status = 1;
				res.send(send);
				});

			});

		}else{
			send = {
				status : 0,
				message : "user not found",
			}
			
			res.send(send);
		}
	}) ;
	
}

var check = function(i,meeting1,meeting2){
	console.log(meeting1.title==meeting2.title&&meetings1.date==meeting2.date
					&&meetings1.description==meeting2.description);
}

exports.delete_meeting = function(req,res){

	var meetings2 = req.session.user.meetings;
	var meeting = meetings2[req.body.index];
	meetings2.splice(req.body.index,1);

	
	Users.findOneAndUpdate({username : req.session.username},{meetings : meetings2}).then(function(result){

		Users.findOne({username : meeting.with }).then(function(result){
			var index=0;
	
			meeting.with = req.session.user.username;
			meetings2 = result.meetings;
			//meetings2 = meetings2.splice(meetings2.indexOf(meeting),1);
			//console.log(meeting,meetings2);
			var index=-1;
			for(i=0;i<meetings2.length;i++){
				
				if(meetings2[i].title==meeting.title&&meetings2[i].description==meeting.description&&
					meetings2[i].date==meeting.date){
					meetings2.splice(i,1);
					Users.findOneAndUpdate({ username : result.username},{meetings : meetings2}).then(function(result){
						res.send("done");
					});
				}

			}

			
		});
	});


}


exports.test = function(req,res){
	for(i=0;i<100;i++){
		console.log(i);
	}

	res.send("done");
}