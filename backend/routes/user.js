const express = require('express');
const router = express.Router();
const { User } = require("../db");
const { Account } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");
const zod = require('zod');
const authMiddleware = require('../middleware/middleware');

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
    password: zod.string().min(6)
});

router.post('/signup',async (req,res)=>{
    const {success} = signupBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const {username,firstName,lastName,password} = req.body;

    const userDetails = await User.findOne({username});

    if(userDetails){
        return res.status(411).json({message: "Email already taken."})
    }

    const user = await User.create({username,firstName,lastName,password});

    const userId = user._id;

    const randomBalance = Math.random() * 10000 + 1;

    await Account.create({userId: userId,balance: randomBalance});

    const token = jwt.sign({userId: userId},JWT_SECRET_KEY);

    res.status(200).json({
        message: "User created successfully",
        token: token
    });
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
});

router.post('/signin',async (req,res)=>{
    const {success} = signinBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Error while logging in body"
        });
    }

    const {username,password} = req.body;

    const user = await User.findOne({username: username,password: password});

    if(user){
        const userId = user._id;

        const token = jwt.sign({userId: userId},JWT_SECRET_KEY);

        res.status(200).json({
            token: token
        })
    }else{
        res.status(411).json({
            message: "Error while logging in"
        })
    }
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/",authMiddleware,async (req,res)=>{ 
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({_id: req.userId},req.body);

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk",async(req,res)=>{
    let filter = req.query.filter;

    filter = capitalize(filter);

    let userDetails = await User.find({$or: [
        {firstName: {
            "$regex": filter
            }
        },
        {lastName: {
            "$regex": filter    
            }
        }]
    });

    const username = jwt.decode(req.headers.authorization.slice(7));

    userDetails = userDetails.filter((element)=>{
        return element._id.toString() != username.userId
    })

    res.status(200).json({users: userDetails.map((user)=>{
        return {username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id}
    })});
})

router.get("/users",async(req,res)=>{
    const response = await User.find({}).select("-password -__v");

    const username = jwt.decode(req.headers.authorization.slice(7));

    const users = response.filter((element)=>{
        return element._id.toString() != username.userId
    });

    console.log(users);

    res.status(200).json(users);
})

function capitalize(str){
    if(!str) return str;
    
    let temp = str.slice(1);

    return str[0].toUpperCase() + temp;
}

module.exports = router;