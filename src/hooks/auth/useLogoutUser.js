import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUserService } from "../../services/authService";
import { useContext } from "react";
import { AuthContext } from "../../auth/authProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogoutUser = () => {
  const { logout } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUserService,
    mutationKey: ["logout"],
    onSuccess: (data) => {
      toast.success(data.message || "Logged out successfully");
      logout(); 
      queryClient.setQueryData(['profile'], null);
      queryClient.removeQueries(); 
      navigate("/", { replace: true });
    },
    onError: (error) => {
        toast.error(error.response?.data?.message || "Logout failed. Please try again.");
    }
  });
};
