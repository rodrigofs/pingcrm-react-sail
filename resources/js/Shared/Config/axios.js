import axios from 'axios'

const axiosClient = axios.create()

// @ts-ignore
const host = window.location.protocol + "//"+ window.location.host;

//axiosClient.defaults.headers.common['X-CSRF-TOKEN'] = token.content
axiosClient.defaults.responseType = 'json'
axiosClient.defaults.headers.common = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

axiosClient.interceptors.response.use(
    response => response,
    error => Promise.reject(error.response)
);

axiosClient.defaults.withCredentials = true

export default axiosClient
