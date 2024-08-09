const mongoose = require('mongoose')

const bookSchema = new mongoose.schema({
    name: String,
    author: String,
    coverPicture: String,
    pages: Number,
})

module.exports = mongoose.model('book',bookSchema)