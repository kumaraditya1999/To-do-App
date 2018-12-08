var session = require('express-session');
var url = require('url');

exports.home = function(req,res){
	console.log(req.session.username);
	res.render('profile.ejs');
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
