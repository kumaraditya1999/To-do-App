var express = require('express');
var router = express.Router();

var authenticate = require('../controllers/authenticate.controller');

router.get('/',function(req,res){
	res.render('todoview.ejs',{message :""});
});

router.post('/register',authenticate.register);
router.post('/login',authenticate.login);

module.exports = router;