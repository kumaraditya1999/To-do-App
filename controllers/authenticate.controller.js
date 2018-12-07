var User = require('../models/user.model.js');
var bcrypt = require('bcryptjs');
var salt = 100;
var url = require('url');

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
					bcrypt.hash(req.body.password,8, (err, hash) => {
  						var user = new User({
							firstname : req.body.firstname,
							lastname : req.body.lastname,
							email : req.body.email,
							username : req.body.username,
							password : hash
						}).save().then(function(data,err){
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