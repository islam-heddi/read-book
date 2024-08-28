const mongoose = require('mongoose')

const SchemaPictureProfile = new mongoose.Schema({
    id: String,
    pictureUrl: String,
})

module.exports = mongoose.model('profilepicture',SchemaPictureProfile)