import axios from 'axios'

const instance = axios.create({
    baseURL: "https://tjhkg-forum.herokuapp.com",
    //baseURL: "http://localhost:5000"
})

export default instance