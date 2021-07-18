import axios from 'axios';

export default axios.create({
baseURL: process.env.API_URL || `http://lofi-cinemas.herokuapp.com/`
});