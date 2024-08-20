const express = require('express')
const router = express.Router()
const User = require('./../models/schemauser')
const { hash,compare } = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifySession = require('./../middlewares/auth')

router.put('/updatepassword/:id',async (req,res) => {
    const {newpassword} = req.body
    const {id} = req.params;
    try{
        const hshpwd = await hash(newpassword,10) 
        const user = await User.findByIdAndUpdate({_id:id},{password: hshpwd})
        if(!user) return res.status(400).send("error in updatng")
        else return res.status(200).send("updated successfully")
    }catch(err){
        return res.status(500).send(`internal server error ${err}`)
    }
})

router.post('/verify',verifySession, async (req,res) => {
    const {id,currentpassword} = req.body;
    try{
        const user = await User.findById(id)
        console.log("user : " + user)
        console.log("currentpassword : " + currentpassword)
        const checkpassword = await compare(currentpassword,user.password)
        if(checkpassword) return res.status(200).send("password match")
        else return res.status(400).send("password does not match")
    }catch(err){
        return res.status(500).send(`internal server error ${err}`)
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email not found" });
        }

        // Verify password
        const checkPassword = await compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ error: "Password does not match" });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                date: user.dateofbirth,
            },
            "your-secret-key",
            { expiresIn: "1h" }
        );

        console.log(`JWT token: ${token}`);

        // Set token in cookie
        res.cookie("token", token, { httpOnly: true, secure: true });

        // Send success response
        return res.status(200).json({ message: "Logged in successfully" });
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router