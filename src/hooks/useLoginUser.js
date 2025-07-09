import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { AuthContext } from "../auth/authProvider";

export const useLoginUser = (options = {}) => { 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); 

  return useMutation({
    mutationFn: loginUserService,
    mutationKey: ['login'],
    onSuccess: (data) => {
        console.log("Login Response:", data); 

      const userData = data.data.user;
      login(userData); 
      toast.success(data.message || "Login Success");

      if (userData.role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (err) => {
      toast.error(err.message || "Login Failure");
    }
  });
};