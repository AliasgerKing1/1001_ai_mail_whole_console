require("../config/database")
const mongoose = require("mongoose");

const User = mongoose.Schema({
    fname: String,
    lanme: String,
    email: String,
    password: String,
    send_email: Array,
    receive_email: Array,
    dob : {
        type : String,
        default : ''
    },
    contact : String,
    join_date : String,
})
module.exports = mongoose.model("user", User);