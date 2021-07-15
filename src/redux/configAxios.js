import axios from "axios";
import queryString from "query-string" 
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: "https://lofi-cinemas.herokuapp.com",
  headers:{"content-type":"application/json"},
  paramsSerializer:params =>  queryString.stringify(params)
});

instance.interceptors.request.use(async config =>{
  return config;
})


export default instance;