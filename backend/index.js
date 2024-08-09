const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const movefiles = require('./router/movefiles')
const url = "mongodb://localhost:27017/bookapi"
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const customerRouters = require('./router/customers')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/',movefiles)
app.use('/',customerRouters)

mongoose.connect(url)
.then(() => console.log("database connected"))
.catch((err) => console.log(err))

app.listen(PORT,() => console.log(`the server is running on ${PORT}`))