import axios from 'axios';
const BASE_URL = 'http://10.10.3.224:8080/security/api';

export default axios.create({
    baseURL: BASE_URL
});


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: false
});
const token = JSON.parse(sessionStorage.getItem('token'));
/*export  const configToken = { headers: {"Authorization" : `Bearer ${token}`}};*/

axiosPrivate.defaults.headers.common['Auth-Token'] = `Bearer ${token}`;
/*const token = JSON.parse(sessionStorage.getItem('token'));
export const configToken = { headers: {"Authorization" : `Bearer ${token}`}}*/
