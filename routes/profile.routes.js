const express = require('express');
const router = express.Router();


const profile_controller = require('../controllers/profile.controller');
router.get('/',profile_controller.checkAuthentic, profile_controller.home);
router.post('/add',profile_controller.add);
router.post('/delete',profile_controller.delete);
router.post('/modify',profile_controller.modify);
router.post('/add-meeting',profile_controller.add_meeting);


module.exports = router;
