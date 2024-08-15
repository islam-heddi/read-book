const express = require('express')
const router = express.Router()
const User = require('./../models/schemauser')
const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login',async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user) return res.status(400).send("email not found")
        const checkPassword = await compare(password,user.password)
        if(!checkPassword) return res.status(400).send("password does not match")
        const token = await jwt.sign({id:user._id,name: user.name,email:user.email,date: user.dateofbirth},"your-secret-key",{expiresIn: "1h"})
        console.log(`jwt token : ${token}`)
        res.cookie("jwt",token)
        return res.status(200).send("Logged successfully")
    }catch(err){
        console.log(`ERROR : ${err}`)
    }
})

module.exports = router