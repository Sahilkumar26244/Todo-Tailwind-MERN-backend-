const Task = require("../models/task");
const User = require("../models/user");

const createTask = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;
    const newTask = new Task({ title: title, desc: desc });
    const saveTask = await newTask.save();
    const taskId = saveTask._id;
    await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
    res.status(200).json({ message: "Task created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error!" });
  }
};

const getTasks = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error!" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
    res.status(200).json({ message: "Task deleted!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error!" });
  }
};

const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await Task.findByIdAndUpdate(id, { title: title, desc: desc });
    res.status(200).json({ message: "Task Updated!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error!" });
  }
};

const updateImportantTask = async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const ImpTask = TaskData.important;
    await Task.findByIdAndUpdate(id, { important: !ImpTask });
    res.status(200).json({ message: "Task Updated!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error!" });
  }
};

const updateCompleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const CompleteTask = TaskData.complete;
    await Task.findByIdAndUpdate(id, { complete: !CompleteTask });
    res.status(200).json({ message: "Task Updated!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error!" });
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTasks,
  updateImportantTask,
  updateCompleteTask
};
