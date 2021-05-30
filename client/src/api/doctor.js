import axios from 'axios';

export const apiLoginDoctor = request_data => {
    return axios.post('http://localhost:5000/d_auth', request_data)
}

export const apiRegisterDoctor = request_data => {
    return axios.post('http://localhost:5000/doctors', request_data)
}