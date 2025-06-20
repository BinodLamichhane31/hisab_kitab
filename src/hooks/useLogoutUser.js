import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUserService } from "../services/authService";
import { useContext } from "react";
import { AuthContext } from "../auth/authProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogoutUser = () => {
  const { logout } = useContext(AuthContext);
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logoutUserService,
    mutationKey: ["logout"],
    onSuccess: (data) => {
      logout(); 
      queryClient.clear();
      toast.success(data.message || "Logged out successfully");
      navigate("/")
    },
    onError: (err) => {
      toast.error(err.message || "Logout failed");
    },
  });
};
