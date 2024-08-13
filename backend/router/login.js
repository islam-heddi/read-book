const express = require('express')
const router = express.Router()
const User = require('./../models/schemauser')
const { compare } = require('bcrypt')

router.post('/login',async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user) return res.status(400).send("email not found")
        const checkPassword = await compare(password,user.password)
        if(!checkPassword) return res.status(400).send("password does not match")
        return res.status(200).send("Logged successfully")
    }catch(err){
        console.log(`ERROR : ${err}`)
    }
})

module.exports = router