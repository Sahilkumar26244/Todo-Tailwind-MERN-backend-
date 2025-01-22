const express = require('express');
const {userRegister,userLogin} = require("../controllers/user");


const router = express.Router();

router.route('/').post(userRegister);
router.route('/login').post(userLogin);


module.exports = router