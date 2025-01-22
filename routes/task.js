const express = require('express');
const {createTask} = require("../controllers/task")
const {authenticationToken} = require("./auth")

const router = express.Router();

router.route('/').post(authenticationToken,createTask);
router.route('/login').post();


module.exports = router