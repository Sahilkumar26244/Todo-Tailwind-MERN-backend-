const express = require('express');
const {createTask, getTasks, deleteTask, updateTasks, updateImportantTask, updateCompleteTask} = require("../controllers/task")
const {authenticationToken} = require("./auth")

const router = express.Router();

router.route('/').post(authenticationToken,createTask);
router.route('/get').get(authenticationToken,getTasks);
router.route('/delete/:id').delete(authenticationToken,deleteTask)
router.route('/update/:id').put(authenticationToken,updateTasks)
router.route('/updateImportantTask/:id').put(authenticationToken,updateImportantTask)
router.route('/updateCompleteTask/:id').put(authenticationToken,updateCompleteTask)

module.exports = router