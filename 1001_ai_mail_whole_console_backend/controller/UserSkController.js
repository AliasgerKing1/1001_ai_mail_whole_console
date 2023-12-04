const routes = require("express").Router();
const sha1 = require("sha1")
const UserSk = require("../models/UserBySk");
const jwt = require("jsonwebtoken")
const str = require('random-string')

routes.post("/", async (req,res)=> {
    let email = req.body.email;
    let password = sha1(req.body.password);
    let result = await UserSk.find({email : email});
    if(result?.length > 0) {
        if(result[0]?.password == password) {
            let token_secret = str({
                length: 10,
                numeric: true,
                letters: true,
                special: false,
              })
            let user = {
                fname: result[0]?.fname,
                lname: result[0]?.lanme,
                email: result[0]?.email,
                password: result[0]?.password,
                image : result[0]?.image,
                dob :result[0]?.dob,
                contact : result[0]?.contact,
                _id : result[0]?._id,
                join_date : result[0]?.join_date,
            };
            let token = jwt.sign(user, token_secret)
            res.send({status : 200, success : true, token, token_secret});
        } else 
        res.send({status : 403, success : false, errType : 2});
    } else 
    res.send({status : 403, success : false, errType : 1});
})

routes.get("/", async (req,res)=> {
    let req_token = JSON.parse(req?.headers?.tokenobj)
    if(req_token) {
        let token = req_token?.token;
        let token_secret = req_token?.token_secret;
        let obj = jwt.decode(token, token_secret)
        let result = await UserSk.find({_id : obj?._id})
        res.send(result)
    }
})
routes.get("/:query", async (req,res)=> {
    let query = req.params.query;
    let regex = new RegExp('^' + query, 'i'); // 'i' makes it case insensitive
    let result = await UserSk.find({email : regex})
    res.send(result)
})

routes.use('/add/cred', require('./SkCredController'));

module.exports = routes;


// routes.post("/", async (req,res)=> {

// let  formatDate = (timestamp) => {
    
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(timestamp).toLocaleDateString('en-IN', options);
//   }
//   let date = new Date()
//   const formattedDate = formatDate(date);
// let dummyData = {
//     fname: "Sarrah",
//     lname: "Kirana",
//     email: "s@skmail.com",
//     password: "356a192b7913b04c54574d18c28d46e6395428ab",
//     dob : "20 November 2023",
//     contact : "62320 65453",
//     image : "",
//     join_date : formattedDate,
// }

// let result = await UserSk.create(dummyData);
// })