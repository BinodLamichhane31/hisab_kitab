
// export const getAllUsersService = async (params) => {
//     try {
//         const response = await getAllUsersApi(params)
//         return response.data

import { useQuery } from "@tanstack/react-query"
import { getAllUsersService } from "../../services/admin/userManagementService"
import { useState } from "react"

        
//     } catch (error) {
//         throw error.response?.data?.message || {message:"Failed to fetch users."}
//     }
// }
// export const createUserService = async (data) =>{
//     try {
//         const response = await createUserApi(data)
//         return response.data
//     } catch (error) {
//         throw error.response?.data?.message || {message:"Failed to create user." }
//     }
// }
// export const getUserByIdService = async (id) =>{
//     try {
//         const response = await getUserByIdApi(id)
//         return response.data
//     } catch (error) {
//         throw error.response?.data?.message || {message:"Failed to get user by id."}
        
//     }
// }
// export const updateUserByAdminService = async(id, data) =>{
//    try {
//      const response = await updateUserByAdminApi(id,data)
//      return response.data
//    } catch (error) {
//         throw error.response?.data.message || {message:"User update failed."}
//    }
// }
// export const deleteUserByAdminService = async(id) =>{
//    try {
//      const response = await deleteUserByAdminApi(id)
//      return response.data
//    } catch (error) {
//         throw error.response?.data.message || {message:"User deletion failed."}
//    }
// }
// export const toggleUserStatusService = async(id) =>{
//    try {
//      const response = await toggleUserStatusApi(id)
//      return response.data
//    } catch (error) {
//         throw error.response?.data.message || {message:"Failed to toggle user status."}
//    }
// }

export const useGetAllUsers = () =>{
    const [pageNumber,setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch]  = useState("");
    const [sortField, setSortField] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");

    const query = useQuery(
        {
            queryKey: ['admin_get_users',pageNumber,pageSize,search,sortField,sortOrder],
            queryFn: () => getAllUsersService({
                page:pageNumber,
                size:pageSize,
                search,
                sortField,
                sortOrder
            }),
            keepPreviousdate: true
        }
    )
    return {
        ...query,
        pageNumber,
        setPageNumber,
        pageSize,
        setPageSize,
        search,
        setSearch,
        sortField,
        setSortField,
        sortOrder,
        setSortField
    }
}