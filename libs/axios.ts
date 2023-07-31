import axios from "axios";

export const enqAPI = axios.create({
  baseURL: `http://192.168.1.81:1337/api`,
});
