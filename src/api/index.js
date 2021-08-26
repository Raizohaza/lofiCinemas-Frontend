import axios from 'axios';
export default axios.create({
baseURL: process.env.NODE_ENV.toString() === 'development'?'http://localhost:5000/':`https://lofi-cinemas.herokuapp.com/`
});