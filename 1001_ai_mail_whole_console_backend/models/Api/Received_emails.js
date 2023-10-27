
                require("../../config/database")
const mongoose = require("mongoose");

const Admin = mongoose.Schema({

                        email : Array
    })
    module.exports = mongoose.model("admin", Admin);
                    