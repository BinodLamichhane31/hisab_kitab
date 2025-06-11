import { loginUserApi, registerUserApi } from "../api/authApi";

export const registerUserService = async (formData) =>{
    try {
        const response = await registerUserApi(formData)
        return response.data
        
    } catch (error) {
        throw error.response?.data || {message: "Registration Failed"}
        
    }
}

export const loginUserService = async (formData) =>{
    try {
        const response = await loginUserApi(formData)
        return response.data
        
    } catch (error) {
        throw error.response?.data || {message: "Login Failed"}
        
    }
}