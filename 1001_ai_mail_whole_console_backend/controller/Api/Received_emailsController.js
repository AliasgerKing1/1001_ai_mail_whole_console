
                const routes = require("express").Router();
const Received_emails = require("../../models/Received_emails");

routes.post("/",  async(req,res) => {
    let result = await Received_emails.create(req.body)
    res.send({status : 200, success : true, data : result })
})

routes.get("/:id", async (req,res)=> {
        let id = req.params.id;
        let result = await Received_emails.find({_id : id})
        res.send(result)
})

routes.get("/", async (req,res)=> {
        let result = await Received_emails.find({})
        res.send(result)
})

routes.delete("/:id", async (req,res)=> {
        let id = req.params.id;
        let result = await Received_emails.findAndDelete({_id : id})
        res.send({status : 200, success : true, data : result })
})

routes.put('/:id', async (req,res) => {
    let id = req.params.id;
    await Received_emails.updateMany({_id : id}, req.body)
       // Fetch the updated documents
let result = await Received_emails.find({ _id: id });

        res.send({status : 200, success : true, updatedData : result})
})
module.exports = routes;
                