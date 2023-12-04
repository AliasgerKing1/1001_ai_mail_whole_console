const routes = require("express").Router();
const Email = require('../models/Email')
const User = require('../models/User')

routes.post('/', async (req,res) => {
    let result = await Email.create(req.body)
    await User.updateMany({$push : {send_email : result._id}});
        res.send({status : 200, success : true, addedEmail : result})
})

routes.get('/', async (req,res) => {
    let result = Email.find({})
        res.send(result)
})
routes.get('/sended', async (req,res) => {
    let users = await User.find({}, 'send_email');
    let emails = await Promise.all(users.map(async (user) => {
        return await Email.find({_id : user.send_email});
    }));
    res.send(emails[0]);
});


routes.get('/:id', async (req,res) => {
    let id = req.params.id;
    let result = Email.find({_id : id})
        res.send(result)
})

routes.delete('/:id', async (req,res) => {
    let id = req.params.id;
    let result = Email.deleteOne({_id : id})
        res.send(result)
})
routes.put('/:id', async (req,res) => {
    let id = req.params.id;
    Email.updateMany({_id : id}, req.body)
    let result = Email.find({_id : id})
        res.send(result)
})

module.exports = routes
