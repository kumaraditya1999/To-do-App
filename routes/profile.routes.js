const express = require('express');
const router = express.Router();


const profile_controller = require('../controllers/profile.controller');
router.get('/',profile_controller.checkAuthentic, profile_controller.home);
router.post('/add',profile_controller.add)


module.exports = router;
