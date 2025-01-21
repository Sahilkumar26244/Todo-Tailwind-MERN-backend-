const Task = require("../models/task");
const User = require("../models/user")

const createTask = async(req,res) => {
    try {
        const {title,desc} = req.body;
        const {id} = req.headers;
        const newTask = new Task({title:title,desc:desc})
        const saveTask = await newTask.save()
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, {$push:{tasks:taskId._id}})
        res.status(200).json({message:"Task created"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Internal server error!"})
    }
}

module.exports = {
    createTask
}