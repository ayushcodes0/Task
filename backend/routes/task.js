const router = require("express").Router()
const User = require("../models/user.js");
const Task = require("../models/task.js");
const authenticateToken = require("./auth.js");


// Here I am creating Tasks
router.post("/create-task", authenticateToken, async(req,res)=>{
    try {
        const {title, description, point} = req.body;
        const {id} = req.headers;
        const newTask = await new Task({
            title: title,
            description: description,
            point: point
        }) 
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, {$push: {task: taskId}});
        res.status(200).json({
            message: "Task Created Successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
})

// Here I am fetching Tasks
router.get("/get-all-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const currentUser = await User.findById(id);
        
        res.status(200).json({
            data: currentUser,
            message: "Task Fetched Successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
})

module.exports = router;
