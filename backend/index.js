const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const movefiles = require('./router/movefiles')
const url = "mongodb://localhost:27017/bookapi"
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const customerRouters = require('./router/customers')
const bookRouters = require('./router/books')
const registerRoute = require('./router/register')
const LoginRoute = require('./router/login')
const protectedRoute = require('./router/protectedRoute')
const cookieParser = require('cookie-parser')
const deconnect = require('./router/deconnect')
const profilepicture = require('./router/user')

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    method: ["POST","GET","DELETE","PUT"]
}))
app.use('/files',express.static(path.join(__dirname,'files')))
app.use('/defaultpictures',express.static(path.join(__dirname,'defaultpictures')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/',movefiles)
app.use('/',customerRouters)
app.use('/book/',bookRouters)
app.use('/',registerRoute)
app.use('/',LoginRoute)
app.use('/',protectedRoute)
app.use('/',deconnect)
app.use('/profile/',profilepicture)

mongoose.connect(url)
.then(() => console.log("database connected"))
.catch((err) => console.log(err))

app.listen(PORT,() => console.log(`the server is running on ${PORT}`))