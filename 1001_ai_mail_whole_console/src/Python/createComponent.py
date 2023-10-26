import os
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Homepage"

@app.route("/create/component", methods=['POST'])
def create_component():
    data = request.get_json()
    for i, component in enumerate(data):
        if 'ComponentName' in component:
            dir_path = fr"C:\Users\Aliasger B\1001_ai_mail_whole_console\1001_ai_mail_whole_console\src\Components\Pages\Admin\Email-Api\{component['ComponentName']}"
            if not os.path.exists(dir_path):
                os.makedirs(dir_path)
                with open(f"{dir_path}/{component['ComponentName']}.js", 'w') as f:
                    f.write(f'''
    /* eslint-disable */
    import React from 'react'
    import MainSidebar from '../../../../Shared/MainSidebar'
    import Header from '../../../../Shared/Header'
    import {{getApi{component['ComponentName']}Data, daleteApi{component['ComponentName']}Data, updateApi{component['ComponentName']}Data}} from '../../../../../Services/{component['ComponentName']}Service'
    const {component['ComponentName']} = () => {{
    return (
        <>
        
        </>
    )
    }}

    export default {component['ComponentName']}
    ''')
            dir_path2 = fr"C:\Users\Aliasger B\1001_ai_mail_whole_console\1001_ai_mail_whole_console\src\Services\Api\{component['ComponentName']}Service"
            with open(f"{dir_path2}.js", 'w') as f:
                f.write(f'''
                import axios from 'axios'

let apiUrl = 'http://localhost:4009/api/{component['path']}/'

let AddApi{component['ComponentName']}Data = async (data) => {{
return await axios.post(`${{apiUrl}}`, data);
}}
let getApi{component['ComponentName']}Data = async () => {{
return await axios.get(`${{apiUrl}}`);
}}
let getApi{component['ComponentName']}DataById = async (id) => {{
return await axios.get(`${{apiUrl}}${{id}}`);
}}
let daleteApi{component['ComponentName']}Data = async (id) => {{
return await axios.delete(`${{apiUrl}}${{id}}`);
}}
let updateApi{component['ComponentName']}Data = async (id, data) => {{
return await axios.put(`${{apiUrl}}${{id}}`, data);
}}

export {{daleteApi{component['ComponentName']}Data, getApi{component['ComponentName']}Data, getApi{component['ComponentName']}DataByToken, AddApi{component['ComponentName']}Data, updateApi{component['ComponentName']}Data}}
                ''')

            dir_path3 = fr"C:\Users\Aliasger B\1001_ai_mail_whole_console\1001_ai_mail_whole_console_backend\controller\Api\{component['ComponentName']}Controller"
            with open(f"{dir_path3}.js", 'w') as f:
                f.write(f'''
                const routes = require("express").Router();
const {component['ComponentName']} = require("../../models/{component['ComponentName']}");)

routes.post("/",  async(req,res) => {{
    let result = await {component['ComponentName']}.create(req.body)
    res.send({{status : 200, success : true, data : result }})
}})

routes.get("/:id", async (req,res)=> {{
        let id = req.params.id;
        let result = await {component['ComponentName']}.find({{_id : id}})
        res.send(result)
}})

routes.get("/", async (req,res)=> {{
        let result = await {component['ComponentName']}.find({{}})
        res.send(result)
}})

routes.delete("/:id", async (req,res)=> {{
        let id = req.params.id;
        let result = await {component['ComponentName']}.findAndDelete({{_id : id}})
        res.send({{status : 200, success : true, data : result }})
}})

routes.put('/:id', async (req,res) => {{
    let id : req.params.id;
    await {component['ComponentName']}.updateMany({{_id : id}}, req.body)
       // Fetch the updated documents
let result = await {component['ComponentName']}.find({{ _id: id }});

        res.send({{status : 200, success : true, updatedData : result}})
}})
module.exports = routes;
                ''')
            dir_path4 = fr"C:\Users\Aliasger B\1001_ai_mail_whole_console\1001_ai_mail_whole_console_backend\controller\Api\{component['ComponentName']}Controller"
            with open(f"{dir_path4}.js", 'w') as f:
                f.write(f'''
                require("../../config/database")
const mongoose = require("mongoose");

const Admin = mongoose.Schema({{
    password: String,
    username: String,
    join_date : String,
    role : String,
    email: String,
}})
module.exports = mongoose.model("admin", Admin);
                ''')
        else:
            print(f"Component {i} does not have a 'ComponentName'")


    return "200"

