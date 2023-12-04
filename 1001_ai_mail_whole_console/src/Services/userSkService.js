import axios from 'axios'

let apiUrl = 'http://localhost:4009/api/user/sk/'

let userDataByToken = async (data) => {
    return await axios.post(`${apiUrl}`, data);
}
let addCredByToken = async (token) => {
    return await axios.get(`${apiUrl}add/cred`, {headers : {token}});
}
let getUserDataByTaken = async (tokenObj) => {
    return await axios.get(`${apiUrl}`, {headers : {tokenObj}});
}
let getReceiver = async (query) => {
    return await axios.get(`${apiUrl}${query}`);
}
export { userDataByToken,addCredByToken, getUserDataByTaken, getReceiver}