import axios from 'axios'

let apiUrl = 'http://localhost:4009/api/user/'

let loginGoogle = async (data) => {
    return await axios.post(`${apiUrl}loginauth`, data);
}
let login = async (data) => {
    return await axios.post(`${apiUrl}loginauth`, data);
}
let signup = async (data) => {
    return await axios.post(`${apiUrl}`, data);
}
let getUserData = async (token) => {
    return await axios.get(`${apiUrl}`, {headers : {token}});
}
export {loginGoogle, login, getUserData, signup}