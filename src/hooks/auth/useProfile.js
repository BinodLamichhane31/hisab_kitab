import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileService, updateProfileService, uploadProfileImageService } from "../../services/authService";

export const useGetProfile = () => {
  const token = localStorage.getItem("token"); 

  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileService,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    retry: false, 
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfileService,
    onSuccess: (response) => {
      toast.success(response?.message || "Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred while updating profile.");
    },
  });
};


export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadProfileImageService,
    onSuccess: (response) => {
      toast.success(response?.message || "Image uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to upload image.");
    },
  });
};
