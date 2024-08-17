const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth')

router.post('/deconnect',verifyToken,(req,res) => {
    res.clearCookie('token')
    return res.status(200).send("deconnected successfully")
})

module.exports = router