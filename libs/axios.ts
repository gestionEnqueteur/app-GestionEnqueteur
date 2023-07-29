import axios from "axios";
import "@env";

export const enqAPI = axios.create({
  baseURL: `http://${process.env.IP_ADDRESS}:${process.env.PORT}/api`,
});
