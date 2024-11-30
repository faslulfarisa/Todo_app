import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
    },
});
axiosInstance.interceptors.request.use(
    (config)=>{
        // retrieve Token
        const accessToken = localStorage.getItem("token");
        // Check Token Existance
        if(accessToken){
            // set Authorizataion header
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
);
export default axiosInstance;

