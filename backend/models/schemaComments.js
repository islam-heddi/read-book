const mongoose = require('mongoose')

const SchemaComments = new mongoose.Schema({
    commenterid: String,
    bookid: String,
    comment: String,
    datePublish: String, 
})

module.exports = mongoose.model("comment",SchemaComments)