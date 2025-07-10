// hooks/auth/useLoginUser.js
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authProvider";
import { loginUserService } from "../../services/authService";

export const useLoginUser = (options = {}) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUserService,
    mutationKey: ['login'],
    onSuccess: (data) => {
      // The 'data' here is the full response from your API
      const { user, shops } = data.data;
      console.log("Login Data:",data);
      

      // The new login function takes the whole payload
      login(data);
      toast.success(data.message || "Login Success");

      // *** NEW NAVIGATION LOGIC ***
      if (user.role === 'admin') {
        navigate("/admin/dashboard");
      } else if (shops && shops.length > 0) {
        navigate("/dashboard");
      } else {
        console.log("Create Shop");
        
        // User has no shops, prompt them to create one
        navigate("/create-first-shop");
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message || "Login Failure");
    }
  });
};