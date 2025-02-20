const express = require('express');
require("dotenv").config();
require("./connection/connectDb.js");
const cors = require("cors");

const UserApi = require("./routes/user");

const app = express()
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 3000

// Main Routes
app.use("/api/v1",UserApi);



app.listen(port, () => {
    console.log(`App is running`)
})