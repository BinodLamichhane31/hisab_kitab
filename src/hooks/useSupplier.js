import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addSupplierService,
  getSuppliersByShopService,
  getSupplierByIdService,
  updateSupplierService,
  deleteSupplierService
} from "../services/supplierService";

export const useAddSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSupplierService,
    mutationKey: ['add_supplier'],
    onSuccess: (data) => {
      toast.success(data.message || "Supplier added successfully.");
      queryClient.invalidateQueries(['suppliers']);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add supplier.");
    },
  });
};

export const useGetSuppliersByShop = (params) => {
  return useQuery({
    queryKey: ['suppliers', params],
    queryFn: () => getSuppliersByShopService(params),
    select: (res) => res.data,
    enabled: !!params?.shopId,
    retry: false,
  });
};

export const useGetSupplierById = (id) => {
  return useQuery({
    queryKey: ['supplier', id],
    queryFn: () => getSupplierByIdService(id),
    select: (res) => res.data,
    enabled: !!id,
    retry: false,
  });
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateSupplierService(id, data),
    mutationKey: ['update_supplier'],
    onSuccess: (data) => {
      toast.success(data.message || "Supplier updated successfully.");
      queryClient.invalidateQueries(['suppliers']);
      queryClient.invalidateQueries(['supplier', data.data._id]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update supplier.");
    },
  });
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteSupplierService(id),
    mutationKey: ['delete_supplier'],
    onSuccess: (data) => {
      toast.success(data.message || "Supplier deleted.");
      queryClient.invalidateQueries(['suppliers']);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete supplier.");
    },
  });
};
