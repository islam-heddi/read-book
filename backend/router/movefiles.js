const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.post('/move',(req,res) => {
    const { oldpath } = req.body
    const ext = path.extname(oldpath)
    if(ext != ".pdf") return res.status(400).send("Error : the extension must be pdf")
    const filename = path.basename(oldpath,'.pdf')
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth()
    var day = today.getDay()
    var hour = today.getHours()
    var minute = today.getMinutes()
    var second = today.getSeconds()
    const newpath = `./files/${filename}${year}${month}${day}${hour}${minute}${second}.pdf`
    fs.copyFile(oldpath,newpath,(err) => {
        if(err) return res.status(400).send(`Error : ${err}`)
        res.status(200).send("Sended successfully")
    }) 
})

module.exports = router;