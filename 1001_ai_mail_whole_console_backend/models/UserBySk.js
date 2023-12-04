require("../config/database")
const mongoose = require("mongoose");

const UserBySk = mongoose.Schema({
    fname: String,
    lanme: String,
    email: String,
    password: String,
    dob : {
        type : String,
        default : ''
    },
    contact : String,
    join_date : String,
})
module.exports = mongoose.model("user_sk", UserBySk);