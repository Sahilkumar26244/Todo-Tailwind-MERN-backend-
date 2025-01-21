const express = require('express');
const {userRegister} = require("../controllers/user");

const router = express.Router();

router.route('/').post(userRegister);


module.exports = router