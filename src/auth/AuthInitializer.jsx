import { useContext, useEffect } from "react";
import { useGetProfile } from "../hooks/useGetProfile";
import FullPageLoader from "../components/ui/FullPageLoader";
import { AuthContext } from "./authProvider";

const AuthInitializer = ({ children }) => {
  const { setUser, setIsLoading } = useContext(AuthContext);
  
  const { data, isSuccess, isError, isLoading } = useGetProfile();

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data.data); 
    }
    
    if (isError) {
      setUser(null); 
    }

 
    if (!isLoading) {
      setIsLoading(false);
    }

  }, [isSuccess, isError, isLoading, data, setUser, setIsLoading]);

  if (isLoading) {
    return <FullPageLoader />;
  }
  
  return children;
};

export default AuthInitializer;