const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth')

router.get('/board',verifyToken,(req,res) => {
    res.status(200).send("PROTECTED ROUTE")
})

module.exports = router