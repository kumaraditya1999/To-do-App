const express = require('express');
const router = express.Router();


const user_controller = require('../controllers/user.controller');
router.get('/test', user_controller.test);
router.post('/create', product_controller.product_create);
console.log(user_controller.test);

module.exports = router;