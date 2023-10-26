
                import axios from 'axios'

let apiUrl = 'http://localhost:4009/api/email/user/'

let AddApiUser_statsData = async (data) => {
return await axios.post(`${apiUrl}`, data);
}
let getApiUser_statsData = async () => {
return await axios.get(`${apiUrl}`);
}
let getApiUser_statsDataById = async (id) => {
return await axios.get(`${apiUrl}${id}`);
}
let daleteApiUser_statsData = async (id) => {
return await axios.delete(`${apiUrl}${id}`);
}
let updateApiUser_statsData = async (id, data) => {
return await axios.put(`${apiUrl}${id}`, data);
}

export {daleteApiUser_statsData, getApiUser_statsData, getApiUser_statsDataByToken, AddApiUser_statsData, updateApiUser_statsData}
                