const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: String,
    publisherid: String,
    author: String,
    coverPicture: String,
    pages: Number,
    pathbook: String,
})

module.exports = mongoose.model('book',bookSchema)