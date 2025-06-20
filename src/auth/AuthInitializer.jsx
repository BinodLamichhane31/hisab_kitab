// AuthInitializer.jsx - AFTER (FIXED)

import { useContext, useEffect } from "react";
import { useGetProfile } from "../hooks/useGetProfile";
import FullPageLoader from "../components/ui/FullPageLoader";
import { AuthContext } from "./authProvider";

const AuthInitializer = ({ children }) => {
  const { setUser, setIsLoading, isLoading } = useContext(AuthContext);

  const { data, isSuccess, isError, isFetching } = useGetProfile();

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data.data);
    } else if (isError) {
      setUser(null);
    }

    if (!isFetching) {
      setIsLoading(false);
    }
  }, [isSuccess, isError, data, isFetching, setUser, setIsLoading]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return children;
};

export default AuthInitializer;