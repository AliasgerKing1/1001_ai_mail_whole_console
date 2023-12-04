import axios from 'axios'

let apiUrl = 'http://localhost:4009/api/email/'

let suggestUser = async (email) => {
    return await axios.post(`${apiUrl}`, email);
}

let sendEmail = async (email) => {
    return await axios.post(`${apiUrl}`, email);
}
let getSendedEmail = async () => {
    return await axios.get(`${apiUrl}sended`);
}

export {suggestUser, sendEmail, getSendedEmail}