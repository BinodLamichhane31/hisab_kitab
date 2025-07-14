import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetShops, useSelectActiveShop } from "../hooks/useShop";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true); 
    
    const [currentShopId, setCurrentShopId] = useState(() => 
        localStorage.getItem("currentShopId")
    );

    const queryClient = useQueryClient();
    const { data: shops, isLoading: shopsLoading } = useGetShops();

    const { mutate: switchShopMutation } = useSelectActiveShop();

    const currentShop = useMemo(() => {
        if (shops && currentShopId) {
            return shops.find(s => s._id === currentShopId);
        }
        return shops?.[0] || null;
    }, [shops, currentShopId]);
    
    useEffect(() => {
        if (!currentShopId && shops?.length > 0) {
            setCurrentShopId(shops[0]._id);
        }
    }, [shops, currentShopId]);


    const login = useCallback((loginData) => {
        const { data, token } = loginData;
        const { user: userData, currentShopId: initialShopId } = data;

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        setUser(userData);

        if (initialShopId) {
            localStorage.setItem("currentShopId", initialShopId);
            setCurrentShopId(initialShopId);
        }
        
        queryClient.invalidateQueries({ queryKey: ['shops'] });
    }, [queryClient]);

    const logout = useCallback(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("currentShopId");
        
        setUser(null);
        setCurrentShopId(null);

        queryClient.clear();
    }, [queryClient]);

    const switchShop = useCallback(async (shopId) => {
        setCurrentShopId(shopId);
        localStorage.setItem("currentShopId", shopId);
        
        switchShopMutation(shopId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['customers'] });
                queryClient.invalidateQueries({ queryKey: ['products'] });
                queryClient.invalidateQueries({ queryKey: ['suppliers'] });
            },
            onError: () => {
                const previousShopId = currentShop?._id || null;
                setCurrentShopId(previousShopId);
                if (previousShopId) {
                    localStorage.setItem("currentShopId", previousShopId);
                } else {
                    localStorage.removeItem("currentShopId");
                }
            }
        });
    }, [queryClient, switchShopMutation, currentShop]);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setAuthLoading(false);
    }, []); 

    const loading = authLoading || (!!user && shopsLoading);

    return (
        <AuthContext.Provider
            value={{
                user,
                shops: shops || [], 
                currentShop,
                loading,
                login,
                logout,
                switchShop,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;