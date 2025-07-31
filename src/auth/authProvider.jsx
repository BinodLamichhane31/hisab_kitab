import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetShops, useSelectActiveShop } from "../hooks/useShop";
import { socket } from "../socket";
import SwitchingShopOverlay from "../components/ui/SwitchingShopOverlay";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true); 
    const [isSwitchingShop, setIsSwitchingShop] = useState(false); 
    const [switchingToShopName, setSwitchingToShopName] = useState(''); 
    const [toastInfo, setToastInfo] = useState(null);

    
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

    useEffect(() => {
        if (user?._id) {
            socket.connect();
            socket.emit('joinRoom', user._id);
        } else {
            socket.disconnect();
        }
        return () => { socket.disconnect(); };
    }, [user]);

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

    const showQueuedToast = () => {
        if (toastInfo) {
            if (toastInfo.type === 'success') {
                toast.success(toastInfo.message);
            } else if (toastInfo.type === 'error') {
                toast.error(toastInfo.message);
            }
            // Reset the queue after showing the toast
            setToastInfo(null);
        }
    };

    const switchShop = useCallback(async (shopId) => {
        const targetShop = shops.find(s => s._id === shopId);
        if (!targetShop) return;

        setSwitchingToShopName(targetShop.name);
        setIsSwitchingShop(true);
        setCurrentShopId(shopId);
        localStorage.setItem("currentShopId", shopId);
        
        switchShopMutation(shopId, {
            onSuccess: () => {
                // DON'T show toast yet. Just queue it.
                setToastInfo({ type: 'success', message: `Successfully switched to ${targetShop.name}` });

                queryClient.invalidateQueries();
                setTimeout(() => {
                    setIsSwitchingShop(false);
                }, 3000); // Increased delay to let the cool animation play out
            },
            onError: (error) => {
                // Queue the error toast and hide the overlay immediately
                setToastInfo({ type: 'error', message: error.message || "Failed to switch shop." });
                setIsSwitchingShop(false);
                // Revert logic remains the same
                const previousShopId = currentShop?._id || null;
                setCurrentShopId(previousShopId);
                // ... etc ...
            }
        });
    }, [queryClient, switchShopMutation, currentShop, shops,setToastInfo]);
    
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
            <SwitchingShopOverlay 
                isVisible={isSwitchingShop} 
                shopName={switchingToShopName} 
                onExitComplete={showQueuedToast}
            />
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;