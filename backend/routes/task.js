const router = require("express").Router()
const User = require("../models/user.js");
const Task = require("../models/task.js");
const authenticateToken = require("./auth.js");

// On this page I have created a lot of apis for different usecases 
// for each task I have made a point field in taskModel from where on creating a task I am assigning how much point the task hold

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
router.delete("/delete-task/:id", async(req,res)=>{
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

// Here I am Updating Imp Tasks
router.put("/update-important-task/:id", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.params;
        const currentTask = await Task.findById(id);
        const impTask = currentTask.important;
        await Task.findByIdAndUpdate(id, {important: !impTask});

        res.status(200).json({
            message: "Important Task Updated Successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
})

// Here I am Updating Complete Tasks
router.put("/update-complete-task/:id", authenticateToken, async(req,res)=>{
    try {
        const userId = req.headers["id"];
        const {id} = req.params;
        const currentTask = await Task.findById(id);
        const compTask = currentTask.complete;
        const user = await User.findById(userId);
        if(!compTask){
            user.totalPoints += currentTask.point;

            // Counting completed tasks
            const completedTasks = await Task.countDocuments({ _id: { $in: user.task }, complete: true });

            // Checking if user has completed 5 tasks
            if (completedTasks + 1 === 5) {  // +1 because the current task is being marked complete
                user.totalPoints += 200;  // Add bonus points
            }
        }
        else{
            user.totalPoints -= currentTask.point
            if(user.totalPoints <0) user.totalPoints = 0
        }
        await user.save();
        await Task.findByIdAndUpdate(id, {complete: !compTask});

        res.status(200).json({
            message: "Complete Task Updated Successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
})

// Here I am fetching Important Tasks
router.get("/get-important-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const currentUser = await User.findById(id).populate({path: "task", match: {important: true}, options: {sort: {createdAt: -1}}});
        const impTask = currentUser.task;
        res.status(200).json({
            data: impTask,
            message: "Task Fetched Successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
})

// Here I am fetching Completed Tasks
router.get("/get-completed-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const currentUser = await User.findById(id).populate({path: "task", match: {complete: true}, options: {sort: {createdAt: -1}}});
        const compTask = currentUser.task;
        res.status(200).json({
            data: compTask,
            message: "Task Fetched Successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
})

// Here I am fetching Incompleted Tasks
router.get("/get-incompleted-tasks", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const currentUser = await User.findById(id).populate({path: "task", match: {complete: false}, options: {sort: {createdAt: -1}}});
        const compTask = currentUser.task;
        res.status(200).json({
            data: compTask,
            message: "Task Fetched Successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
})


router.get("/get-user", authenticateToken, async(req,res)=>{
    try {
        const userId = req.headers["id"];
        const user = await User.findById(userId);
        res.status(200).json({
            data: user,
            message: "Success"
        })
    } catch (error) {
        res.status(400).json({
            message: "internal server error"
        })
        
    }
})

module.exports = router;
