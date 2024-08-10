const express =require('express')
const router = express.Router()
const User = require('./../models/schemauser')
const {hash} = require('bcrypt')


router.post('/register',async (req,res) => {
    const {name, dateofbirth, gender , email } = req.body
    let { password } = req.body
    try{
        password = await hash(password, 10)
        console.log(password)
        const newUser = new User({
            name,
            dateofbirth,
            gender,
            email,
            password
        })
        newUser.save()
        .then(() => res.status(200).send("added successfully"))
        .catch(err => res.send(`error : ${err}`))
    }catch(err){
        res.status(500).send(`error : ${err}`)
    }
})


module.exports = router