import axios from 'axios'

let apiUrl = 'http://localhost:4009/api/email/'

let suggestUser = async (email) => {
    return await axios.post(`${apiUrl}`, email);
}

export {suggestUser}