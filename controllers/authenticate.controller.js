var User = require('../models/user.model.js');
var bcrypt = require('bcryptjs');
var salt = 100;
exports.register = function(req,res){
	//console.log(req);
	console.log("here");
	User.findOne({username : req.body.username}).then(function(result){
		if(result){
			console.log("this username is already taken please select another one!!! ");
			res.render('todoview.ejs',{message : "this username is already taken please select another one!!! "});
		}else{

			User.findOne({email : req.body.email}).then(function(result){
				if(result){
					res.render('todoview.ejs',{message : "this email is already in use please login instead!!! "});
					console.log("this email is already in use please login instead!!! ");
				}else{
					console.log("here");
					bcrypt.hash(req.body.password,8, (err, hash) => {
  						// Store hash password in DB
  						console.log(err+hash);
  						var user = new User({
							firstname : req.body.firstname,
							lastname : req.body.lastname,
							email : req.body.email,
							username : req.body.username,
							password : hash
						}).save().then(function(data,err){
								console.log("User added");
								res.send("done");
						//res.render('profile.ejs',{username : req.body.username});
							});
					});
					
					
				}
			});
		}
	});
	
}

exports.login = function(req,res){
	var resobj = res;
	User.findOne({username : req.body.username}).then(function(result){
		if(result){
			console.log(result.password);
			bcrypt.compare(req.body.password,result.password , (err, res) => {
 				 // res == true or res == false
 				 if(res==true){
 				 	resobj.send("userfound you are going to login");
 				 }else{
 				 	resobj.send("password did'nt match please try again");
 				 }
			});
		}else{
			res.send("user not found");
		}
	});

}