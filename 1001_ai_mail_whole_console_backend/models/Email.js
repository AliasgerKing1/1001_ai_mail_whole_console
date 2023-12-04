require("../config/database")
const mongoose = require("mongoose");

const Email = mongoose.Schema({
    sender_email : String,
    receiver_email : String,
    message : String

})
module.exports = mongoose.model("email", Email);