import axios from 'axios';

export const apiLoginPatient = request_data => {
    return axios.post('http://localhost:5000/p_auth', request_data)
}

export const apiRegisterPatient = request_data => {
    return axios.post('http://localhost:5000/patients', request_data)
}