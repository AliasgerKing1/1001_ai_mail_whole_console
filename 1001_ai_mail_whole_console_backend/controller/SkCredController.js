const routes = require("express").Router();
const sha1 = require("sha1")
const SkCred = require("../models/AddCred");
const jwt = require("jsonwebtoken")
const str = require('random-string')

routes.get("/", async (req,res)=> {
    if(req.headers.token) {
        let token = req.headers.token;
        let obj = jwt.decode(token, "Aliasger web")
        let client_id = str({
            length: 22,
            numeric: true,
            letters: true,
            special: false,
          })
        let client_secret = str({
            length: 22,
            numeric: true,
            letters: true,
            special: false,
          })

          let newCred = {
            user_id : obj._id,
            client_id : client_id,
            client_secret : client_secret,
          }
          let result = await SkCred.create(newCred);
          res.send(result)
    }
})


module.exports = routes;