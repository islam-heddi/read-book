const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const movefiles = require('./router/movefiles')

const PORT = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/',movefiles)

app.listen(PORT,() => console.log(`the server is running on ${PORT}`))