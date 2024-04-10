const express = require('express');
const authMiddleware = require('../middleware/middleware');
const { Account } = require('../db');
const router = express.Router();
const zod = require('zod');

//learn transactions

router.get("/balance",authMiddleware,async (req,res)=>{

    const userBalance = await Account.findOne({userId: req.userId});

    res.status(200).json({
        balance: userBalance.balance
    })
})

const transferBody = zod.object({
    to: zod.string(),
    amount: zod.number().gt(0)
})

router.post('/transfer',authMiddleware,async (req,res)=>{
    const {to,amount} = req.body;

    const success = transferBody.safeParse(req.body);

    if(!success){
        res.status(400).json({
            message: "Invalid Inputs"
        })
    }

    const sender = await Account.findOne({userId: req.userId});

    const receiver = await Account.findOne({userId: to});

    if(!receiver){
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    if(sender.balance < amount){
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    await Account.updateOne({userId: req.userId},{ $inc: {
        balance: -amount
    }});

    await Account.updateOne({userId: to},{ $inc: {
        balance: amount
    }});

    res.status(200).json({
        message: "Transfer successful"
    });
})

module.exports = router;