//para realizar socilitação http no lado cliente utilizo o axios
import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.API_GITHUB
})