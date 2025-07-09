import { useQuery } from "@tanstack/react-query";
import { getProfileService } from "../../services/authService";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileService,
    refetchOnWindowFocus: false, 
    retry: false, 
    staleTime: 5 * 60 * 1000, 
    retry: false, 
    
  });
};
