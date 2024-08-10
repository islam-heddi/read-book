const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    dateofbirth: Date,
    email: String,
    password: String,
    gender: String,
})

module.exports = mongoose.model('User',userSchema)