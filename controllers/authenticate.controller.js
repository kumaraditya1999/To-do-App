var User = require('../models/user.model.js');
var bcrypt = require('bcryptjs');
var salt = 8;
var url = require('url');
var session =require('express-session');

exports.register = function(req,res){

	User.findOne({username : req.body.username}).then(function(result){
		if(result){
			res.redirect(url.format({
				       pathname:"/",
				       query: {
				          "message": "this username is already taken please select another one!!! "}
				     }));
		}else{

			User.findOne({email : req.body.email}).then(function(result){
				if(result){
					res.redirect(url.format({
				       pathname:"/",
				       query: {
				          "message": "this email is already in use please login instead!!! " }
				     }));
				}else{
					bcrypt.hash(req.body.password,salt, (err, hash) => {
  						var user = new User({
							firstname : req.body.firstname,
							lastname : req.body.lastname,
							email : req.body.email,
							username : req.body.username,
							password : hash
						});
						user.save().then(function(data,err){
								req.session.username = req.body.username;
								req.session.user = user;
								res.redirect(url.format({
							       pathname:"/profile",
							       query: {
							          "message": "welcome" }
							     }));
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
			bcrypt.compare(req.body.password,result.password , (err, res) => {
 				 if(res==true){
 				 	 req.session.username = req.body.username;
 				 	 req.session.user = result;
 				 	resobj.redirect(url.format({
				       pathname:"/profile",
				       query: {
				          "message": "welcome" }
				     }));
 				 }else{
 				 	resobj.redirect(url.format({
				       pathname:"/",
				       query: {
				          "message": "password did'nt match please try again" }
				     }));
 				 }
			});
		}else{
			resobj.redirect(url.format({
				       pathname:"/",
				       query: {
				          "message": "user not found" }
				     }));
		}
	});

}

exports.logout = function(req,res){
	
	req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
});

}

// exports.checkAuthentic = function(req,res,next){
// 	if(req.session.username){
// 		next();
// 	}else{
// 		res.redirect('/',{message : "please login or register first"});
// 	}
// }
