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
        const currentUser = await User.findById(id).populate({path: "task", options: {sort: {createdAt: -1}}});
        
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

// Here I am Deleting Tasks
router.delete("/delete-task/:id", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, {$pull: {task: id}});

        res.status(200).json({
            message: "Task Deleted Successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
})

// Here I am Updating Tasks
router.put("/update-task/:id", authenticateToken, async(req,res)=>{
    try {
        const {title, description} = req.body;
        const {id} = req.params;
        await Task.findByIdAndUpdate(id, {title: title, description: description});

        res.status(200).json({
            message: "Task Updated Successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
})

module.exports = router;
