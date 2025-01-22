const express = require('express');
const {createTask, getTasks, deleteTask} = require("../controllers/task")
const {authenticationToken} = require("./auth")

const router = express.Router();

router.route('/').post(authenticationToken,createTask);
router.route('/get').get(authenticationToken,getTasks);
router.route('/delete/:id').delete(authenticationToken,deleteTask)


module.exports = router