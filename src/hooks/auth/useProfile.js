import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileService, updateProfileService, uploadProfileImageService } from "../../services/authService";

export const useGetProfile = () => {
  const token = localStorage.getItem("token"); 
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileService,
    enabled: !!token && !!user,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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
