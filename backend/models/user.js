const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    task: [
        {
            type: mongoose.Types.ObjectId,
            ref: "task"
        }
    ],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, {timestamps: true}) 

module.exports = mongoose.model("user", userSchema);