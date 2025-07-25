import axios from "./api";
export const registerUserApi = (data) => axios.post("/auth/register",data)
export const loginUserApi = (data) => axios.post("/auth/login",data,{withCredentials:true})
export const logoutUserApi = () => axios.post("/auth/logout", {}, { withCredentials: true });
export const getProfileApi = () => axios.get("/auth/profile", { withCredentials: true });
