const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const movefiles = require('./router/movefiles')

const PORT = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/',movefiles)

app.get('/',(req,res) => {
    res.send("Hello world")
})

app.post('/move',(req,res) => {
    const { oldpath } = req.body
    const newpath = "./files/thisfile.txt"
    fs.rename(oldpath,newpath,(err) => {
        if(err) return res.status(400).send("Error")
        res.status(200).send("Sended successfully")
    }) 
})

app.listen(PORT,() => console.log(`the server is running on ${PORT}`))