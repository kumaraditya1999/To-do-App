var express = require('express');
var router = express.Router();

var authenticate = require('../controllers/authenticate.controller');

router.get('/',function(req,res){
	req.session.username = "";
	res.render('todoview.ejs',{message :req.query.message});
});

router.post('/register',authenticate.register);
router.post('/login',authenticate.login);
router.post('/logout',authenticate.logout);
module.exports = router;
