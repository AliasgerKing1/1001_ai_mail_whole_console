require("../config/database")
const mongoose = require("mongoose");

const Sk_cred = mongoose.Schema({
    user_id: String,
    client_id: String,
    client_secret: String,

})
module.exports = mongoose.model("sk_cred", Sk_cred);