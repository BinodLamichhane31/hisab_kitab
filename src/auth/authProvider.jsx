// src/auth/authProvider.js
import { createContext, useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { selectActiveShopService } from "../services/shopService";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [shops, setShops] = useState([]);
    const [currentShop, setCurrentShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const queryClient = useQueryClient();


    const login = (loginData) => {
        setLoading(true);
        console.log("Context:",loginData);
        const { data, token } = loginData;
        const { user: userData, shops: userShops, currentShopId } = data;
        
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        localStorage.setItem("shops", JSON.stringify(userShops || []));

        setUser(userData);
        setShops(userShops || []);

        if (currentShopId && userShops?.length > 0) {
            const activeShop = userShops.find(s => s._id === currentShopId);
            setCurrentShop(activeShop);
            localStorage.setItem("currentShop", JSON.stringify(activeShop)); 
        } else {
            setCurrentShop(null);
            localStorage.removeItem("currentShop"); 
        }
        setLoading(false);
    };

    const logout = () => {
        setLoading(true);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("shops"); 
        localStorage.removeItem("currentShop"); 
        setUser(null);
        setShops([]);
        setCurrentShop(null);
        queryClient.clear(); 
        setLoading(false);
    };

    const switchShop = async (shopId) => {
        try {
            const newShop = shops.find(s => s._id === shopId);
            if(newShop) {
                setCurrentShop(newShop);
                localStorage.setItem("currentShop", JSON.stringify(newShop)); 
            }

            await selectActiveShopService(shopId); 
            
            await queryClient.invalidateQueries({ queryKey: ['customers'] });
            await queryClient.invalidateQueries({ queryKey: ['products'] });
            await queryClient.invalidateQueries({ queryKey: ['suppliers'] });

        } catch (error) {
            console.error("Failed to switch shop", error);
            const storedCurrentShop = localStorage.getItem("currentShop");
            if (storedCurrentShop) {
                setCurrentShop(JSON.parse(storedCurrentShop));
            } else {
                setCurrentShop(null);
            }
        }
    };
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedShops = localStorage.getItem("shops"); 
        const storedCurrentShop = localStorage.getItem("currentShop"); 

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            if (storedShops) {
                setShops(JSON.parse(storedShops));
            }
            if (storedCurrentShop) {
                setCurrentShop(JSON.parse(storedCurrentShop));
            }
        }
        setLoading(false);
    }, []); 

    return (
        <AuthContext.Provider
            value={{
                user,
                shops,
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