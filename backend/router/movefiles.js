const express = require('express')
const router = express.Router()
const fs = require('fs')

router.post('/move',(req,res) => {
    const { oldpath } = req.body
    const newpath = "./files/thisfile.txt"
    fs.rename(oldpath,newpath,(err) => {
        if(err) return res.status(400).send("Error")
        res.status(200).send("Sended successfully")
    }) 
})

module.exports = router;