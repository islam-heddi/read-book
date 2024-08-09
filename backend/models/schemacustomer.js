const mongoose = require("mongoose")

const CustomerSchema = new mongoose.Schema({
    name: String,
    adress: String,
})

module.exports = mongoose.model("customer",CustomerSchema) 