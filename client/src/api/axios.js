import axios from 'axios';

const API = axios.create({
  baseURL: 'https://rvr-builders.onrender.com/api',
});

export default API;
