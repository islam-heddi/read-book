const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const movefiles = require('./router/movefiles')
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

const PORT = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/',movefiles)
MongoClient.connect(url,(err,db) => {
    if(err) throw err
    console.log("connected successfully to the database")
    var dbo = db.db("bookapi")
    dbo.createCollection("customer",(err,res) => {
        if(err) throw err
        console.log("collection created!")
        db.close()
    })
    
})

app.post("/addcustomer",(req,res) => {
    const {name , adress} = req.body;
    MongoClient.connect(url,(err,db) => {
        if(err) throw err
        var dbo = db.db("bookapi")
        var obj = {
            name,
            adress
        }
        dbo.collection("customer").insertOne(obj,(err,res) => {
            if(err) throw err
            console.log("added data")
            db.close()
        })

    })
    res.status(200).send("1 inserted data")
})

app.listen(PORT,() => console.log(`the server is running on ${PORT}`))