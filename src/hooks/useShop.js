import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createShopService, deleteShopService, getShopByIdService, getShopsService, selectActiveShopService, updateShopService } from "../services/shopService";
import { data } from "react-router-dom";

export const useCreateShop = () =>{
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: createShopService,
            mutationKey:['create_shop'],
            onSuccess: (data) =>{   
                toast.success(data.message || "New shop added.")
                queryClient.invalidateQueries(["shops"])
            },
            onError: (error)=>{
                toast.error(error.message || "Failed to add new shop.")
            }
        }
    )
}

export const useGetShops = () =>{
    return useQuery(
        {
            queryKey:['shops'],
            queryFn: getShopsService,
            select: (res) => res.data.data,
            retry: false,
        }
    )
}

export const useGetShopById = (id) =>{
    return useQuery(
        {
            queryKey:['shop',id],
            queryFn: getShopByIdService(id),
            select: (res) => res.data.data,
            enabled: !!id,
            retry: false
        }
    )
}

export const useUpdateShop = () =>{
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn:({id,data})=> updateShopService(id,data),
            mutationKey:['update_shop'],
            onSuccess: (data) =>{
                toast.success(data.message || "Shop updated successfully.")
                queryClient.invalidateQueries(['shops'])
                queryClient.invalidateQueries(['shop',data.data._id])
            },
            onError: (error) =>{
                toast.error(error.message || "Failed to update shop.")
            }
        }
    )
}

export const useDeleteShop = async() =>{
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn:(id) => deleteShopService(id),
            onSuccess: (data) =>{
                toast.success(data.message,"Shop deleted.")
                queryClient.invalidateQueries(['shops'])
            },
            onError: (err) =>{
                toast.error(err.message,"Failed to delete shop.")
            }
        }
    )
}

export const useSelectActiveShop = () => {
    return useMutation(
        {
            mutationFn: (shopId) => selectActiveShopService(shopId),
            onSuccess: (data) =>{
                toast.success(data.data.message || "Shop switched successfully 11.")
            },
            onError: (error) =>{
                toast.error(error.message || "Failed to switch shop.")
            }
        }
    )
}




