const express =require('express')
const router = express.Router()
const User = require('./../models/schemauser')
const {hash} = require('bcrypt')

router.put('/updateuser',(req,res) => {
    const {id,name,email,date} = req.body;
    User.findOneAndUpdate({_id:id},{email,name,date})
    .then(response => res.status(200).send("updated successfully"))
    .catch(err => res.status(500).send(err))
})

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
router.post('/register', async (req, res) => {
    const { name, dateofbirth, gender, email } = req.body;
    let { password } = req.body;
    
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).send("Error: Email already exists");
        }

        console.log("Email does not exist, proceeding...");

        // Hash the password
        password = await hash(password, 10);
        console.log(password);

        // Create the new user
        const newUser = new User({
            name,
            dateofbirth,
            gender,
            email,
            password
        });

        // Save the new user to the database
        await newUser.save();
        res.status(200).send("User added successfully");
        
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
});


module.exports = router