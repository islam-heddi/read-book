const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth')

router.get('/board',verifyToken,(req,res) => {
    const name = req.userName;
    const id = req.userId;
    const email = req.userEmail;
    const date = req.userDate;
    const user = {
        id,
        name,
        email,
        date
    }
    res.status(200).send(user)
})

module.exports = router