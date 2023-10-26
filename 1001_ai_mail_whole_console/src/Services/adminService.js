import axios from 'axios'

let apiUrl = 'http://localhost:4009/api/admin/'

let loginGoogle = async (data) => {
    return await axios.post(`${apiUrl}loginauth`, data);
}
let login = async (data) => {
    return await axios.post(`${apiUrl}loginauth`, data);
}
let getAdminData = async (token) => {
    return await axios.get(`${apiUrl}`, {headers : {token}});
}

export {loginGoogle, login, getAdminData}