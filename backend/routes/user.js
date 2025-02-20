const router = require("express").Router()
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// This is my Sign-in Section
router.post("/sign-in", async(req,res)=>{
    try {
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({username})
        const existingEmail = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "Username already exists"})
        }else if(username.length < 4){
            return res.status(400).json({message: "Username must have 4 characters"})
        }
        if(existingEmail){
            return res.status(400).json({message: "Email already exists"})
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            username: username,
            email: email,
            password: hashPassword,
            totalPoints: 100
        })
        await newUser.save();

        return res.status(200).json({
            message: "Sign In Successfully",
            points: 100
        } 
    )
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
})

// This is my Login Section
router.post("/login", async(req,res)=>{
    try {
        const {username, password} = req.body;
        const existingUser = await User.findOne({username})
        if(!existingUser){
            return res.status(400).json({message: "Invalid Credentials"})
        }
        bcrypt.compare(password, existingUser.password, async(err,data)=>{
            if(data){
                existingUser.totalPoints = (existingUser.totalPoints || 0) + 50;
                await existingUser.save();
                const authClaims = {name: username, jti: jwt.sign({}, "secret")};
                const token = jwt.sign(authClaims, "secret", {expiresIn: "2d"});
                res.status(200).json({
                    id: existingUser._id,
                    token: token,
                    points: 50
                })
            }
            else{
                return res.status(400).json({
                    message: "Invalid Credentials"
                })
            }
        })
        

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
})

module.exports = router;