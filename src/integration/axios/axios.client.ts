import axios from "axios";

const client = axios.create({
  baseURL: 'http:/192.168.0.232:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;