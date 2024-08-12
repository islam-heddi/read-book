const express =require('express')
const router = express.Router()
const User = require('./../models/schemauser')
const {hash} = require('bcrypt')


router.get('/users',(req,res) => {
    User.find()
    .then((users) => res.status(200).send(users))
    .catch(err => res.status(500).send(err))
})

router.post('/findemail',(req,res) =>  {
    const {email} = req.body
    User.findOne({email})
    .then((response) => {
        res.send(response)
    })
    .catch(err => res.status(500).send(err))
})

router.post('/register',async (req,res) => {
    const {name, dateofbirth, gender , email } = req.body
    let { password } = req.body
    try{
        let checkExist = false
        // check the email if exists ?
        User.findOne({email})
        .then((response) => {
            console.log(`respone : ${response}`)
            if(response.email == email) checkExist = true
            else checkExist = false
            console.log("checkExist : " + checkExist)
        })
        .catch(err => res.status(500).send(err))
        if(checkExist) return res.send("Error : Email exists")
        console.log("Email exists " + checkExist)
    // hash the password
        password = await hash(password, 10)
        console.log(password)
        //creating the new user
        const newUser = new User({
            name,
            dateofbirth,
            gender,
            email,
            password
        })
        //executing the data
        newUser.save()
        .then(() => res.status(200).send("added successfully"))
        .catch(err => res.status(400).send(`error : ${err}`))
    }catch(err){
        res.status(500).send(`error : ${err}`)
    }
})


module.exports = router