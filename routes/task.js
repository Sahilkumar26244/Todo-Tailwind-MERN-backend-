const express = require('express');
const {createTask, getTasks, deleteTask, updateTasks, updateImportantTask, updateCompleteTask, getImportantTasks, getCompleteTasks, getInCompleteTasks} = require("../controllers/task")
const {authenticationToken} = require("./auth")

const router = express.Router();

router.route('/').post(authenticationToken,createTask);
router.route('/get').get(authenticationToken,getTasks);
router.route('/delete/:id').delete(authenticationToken,deleteTask)
router.route('/update/:id').put(authenticationToken,updateTasks)
router.route('/updateImportantTask/:id').put(authenticationToken,updateImportantTask)
router.route('/updateCompleteTask/:id').put(authenticationToken,updateCompleteTask)
router.route('/getAllImpTasks').get(authenticationToken,getImportantTasks)
router.route('/getAllCompTasks').get(authenticationToken,getCompleteTasks)
router.route('/getAllIncompTasks').get(authenticationToken,getInCompleteTasks)

module.exports = router