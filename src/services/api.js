import axios from 'axios'

const api = axios.create({
  // Waterpark:
  //baseURL: 'http://192.168.0.65:3333'
  // Casa:
  baseURL: 'http://192.168.1.4:3333'
});

export default api;