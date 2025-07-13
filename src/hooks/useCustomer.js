import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addCustomerService,
  getCustomersByShopService,
  getCustomerByIdService,
  updateCustomerService,
  deleteCustomerService,
} from "../services/customerService";

export const useAddCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCustomerService,
    mutationKey: ['add_customer'],
    onSuccess: (data) => {
      toast.success(data.message || "Customer added successfully.");
      queryClient.invalidateQueries(['customers']);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add customer.");
    },
  });
};

export const useGetCustomersByShop = (params) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => getCustomersByShopService(params),
    select: (res) => res.data,
    enabled: !!params?.shopId,
    retry: false,
  });
};


export const useGetCustomerById = (id) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomerByIdService(id),
    select: (res) => res.data,
    enabled: !!id,
    retry: false,
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCustomerService(id, data),
    mutationKey: ['update_customer'],
    onSuccess: (data) => {
      toast.success(data.message || "Customer updated successfully.");
      queryClient.invalidateQueries(['customers']);
      queryClient.invalidateQueries(['customer', data.data._id]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update customer.");
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCustomerService(id),
    mutationKey: ['delete_customer'],
    onSuccess: (data) => {
      toast.success(data.message || "Customer deleted.");
      queryClient.invalidateQueries(['customers']);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete customer.");
    },
  });
};
