import axios from "axios"


const api = axios.create({baseURL:'https://droidapi-v2.herokuapp.com'})

export default api