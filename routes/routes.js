var express = require('express');
var router = express.Router();

var authenticate = require('../controllers/authenticate.controller');

router.get('/',function(req,res){
	console.log("here in /");
	console.log(req.query);
	res.render('todoview.ejs',{message :req.query.message});
});

router.post('/register',authenticate.register);
router.post('/login',authenticate.login);

module.exports = router;