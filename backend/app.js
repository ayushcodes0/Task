const express = require('express');
require("dotenv").config();
require("./connection/connectDb.js");
const cors = require("cors");

// I have created two type of apis first for user and second for task
// I have created seperate file for the apis
const UserApi = require("./routes/user");
const TaskApi = require("./routes/task");

const app = express()
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 3000

// Main Routes
app.use("/api/v1",UserApi);
app.use("/api/v2",TaskApi);



app.listen(port, () => {
    console.log(`App is running`)
})