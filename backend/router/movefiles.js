const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.post('/addbook',(req,res) => {
    const { namebook,authorbook, oldpath } = req.body
    const ext = path.extname(oldpath)
    if(ext != ".pdf") return res.status(400).send("Error : the extension must be pdf")
    const filename = path.basename(oldpath,'.pdf')
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth()
    month = (month < 10)? "0"+month : month
    var day = today.getDay()
    day = (day < 10)? "0"+day : day
    var hour = today.getHours()
    hour = (hour < 10)? "0"+hour:hour
    var minute = today.getMinutes()
    minute = (minute < 10)? "0"+minute:minute
    var second = today.getSeconds()
    second = (second < 10)? "0"+second:second
    const newpath = `./files/${filename}${year}${month}${day}${hour}${minute}${second}.pdf`
    fs.copyFile(oldpath,newpath,(err) => {
        if(err) return res.status(400).send(`Error : ${err}`)
        res.status(200).send("Sended successfully")
    }) 
})

module.exports = router;