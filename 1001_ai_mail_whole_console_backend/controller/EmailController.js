const routes = require("express").Router();
const User = require('../models/User')
routes.post('/', async (req,res) => {
    let result = User.find({_id : req.body})
    if(result.length > 0) {
        res.send({status : 403, success : false})
    } else {
        res.send({status : 200, success : true})
    }
})

module.exports = routes
