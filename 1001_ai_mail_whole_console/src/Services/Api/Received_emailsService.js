
                import axios from 'axios'

let apiUrl = 'http://localhost:4009/api/email/received/'

let AddApiReceived_emailsData = async (data) => {
return await axios.post(`${apiUrl}`, data);
}
let getApiReceived_emailsData = async () => {
return await axios.get(`${apiUrl}`);
}
let getApiReceived_emailsDataById = async (id) => {
return await axios.get(`${apiUrl}${id}`);
}
let daleteApiReceived_emailsData = async (id) => {
return await axios.delete(`${apiUrl}${id}`);
}
let updateApiReceived_emailsData = async (id, data) => {
return await axios.put(`${apiUrl}${id}`, data);
}

export {daleteApiReceived_emailsData, getApiReceived_emailsData, getApiReceived_emailsDataById, AddApiReceived_emailsData, updateApiReceived_emailsData}
                