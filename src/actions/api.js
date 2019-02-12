import axios from 'axios';

export const baseURL = `${window.location.origin}/api`;
// export const baseURL = `http://192.168.1.165:5000/api`;
export default axios.create({
  withCredentials: true,
  baseURL: baseURL,
});
