import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "http://capstoneproejctcarbookingapp-production.up.railway.app/api",
  withCredentials: true,
});

export default axiosInstance;