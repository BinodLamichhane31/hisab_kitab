import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService";
import { toast } from "react-toastify";
import { AuthContext } from "../auth/authProvider.jsx";
import { useContext } from "react";


export const useLoginUser = () =>{
    const {login} = useContext(AuthContext)
    return useMutation(
        {
            mutationFn: loginUserService,
            mutationKey: ['login'],
            onSuccess: (data) => {
                login(data.data); 
                toast.success(data.message || "Login Success")
            },
            onError: (err) =>{
                toast.error(err.message || "Login Failure")
            }
        }
    )
}