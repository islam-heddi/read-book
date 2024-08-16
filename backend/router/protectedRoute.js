const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth')

router.get('/board',verifyToken,(req,res) => {
    const name = req.userName;
    const id = req.userId
    res.status(200).send(`name : ${name} ////// id : ${id}`)
})

module.exports = router