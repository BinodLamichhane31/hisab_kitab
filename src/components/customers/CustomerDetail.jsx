import React, { useState } from 'react';
import { useDeleteCustomer, useGetCustomerById } from '../../hooks/useCustomer';
import Table from '../common/Table'; 
import { User, FileText, Receipt, DollarSign, ShoppingBag, Calendar, UserCog, Pencil, Mail, Phone, MapPin, Trash } from 'lucide-react';
import { MdMoney } from 'react-icons/md';
import CustomerFormModal from './CustomerFormModal';
import { ConfirmationModal } from '../common/ConfirmationModel';

const getInitials = (name) => {
  if (!name) return '?';
  const names = name.split(' ');
  const initials = names.map(n => n[0]).join('');
  return initials.slice(0, 2).toUpperCase();
};

const CustomerDetail = ({ customerId, onDeleteSuccess }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const { data: customer, isLoading, isError } = useGetCustomerById(customerId);
  const { mutate: deleteCustomer , isPending: isDeleting} = useDeleteCustomer();

  const handleConfirmDelete = () => {
    if (customerId) {
      deleteCustomer(customerId, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          if (onDeleteSuccess) {
            onDeleteSuccess(); 
          }
        }
      });
    }
  };

  if (!customerId) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-50">
        <div className="text-center text-slate-500">
          <UserCog size={48} className="mx-auto mb-4 text-slate-400" />
          <h2 className="text-xl font-semibold text-slate-700">Select a Customer</h2>
          <p className="text-sm">Choose a customer from the list to see their details.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="p-8 text-slate-500">Loading...</div>;
  if (isError) return <div className="p-8 text-red-500">Error loading customer details.</div>;
  if (!customer) return <div className="p-8 text-slate-500">Customer not found.</div>;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
  ];

  return (
    <div className="h-full p-6 overflow-y-auto bg-slate-50">
      <div className="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white bg-orange-500 rounded-full">
            {getInitials(customer.name)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{customer.name}</h1>
            <p className="text-sm text-slate-500">
              Customer since {new Date(customer.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm font-semibold bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-100">
            <Pencil size={14} className="inline mr-2" />
            Edit
          </button>
          <button onClick={() => setIsDeleteModalOpen(true)} className="px-4 py-2 text-sm font-semibold bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-100">
            <Trash size={14} className="inline mr-2" />
            Delete
          </button>          
        </div>
      </div>

      <div className="mb-8">
        <div className="inline-flex p-1 rounded-full bg-slate-200/60" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-full transition-colors focus:outline-none ${
                activeTab === tab.id
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {activeTab === 'overview' && <OverviewTab customer={customer} />}
        {activeTab === 'details' && <DetailsTab customer={customer} />}
        {activeTab === 'transactions' && <TransactionsTab customer={customer} />}
      </div>

      {isModalOpen && (
        <CustomerFormModal 
          onClose={() => setIsModalOpen(false)}
          customerToEdit={customer} 
        />
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Customer"
        message={`Are you sure you want to permanently delete "${customer.name}"? This action cannot be undone.`}
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
      />
      
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value }) => (
  <div className="flex items-center p-5 bg-white border border-slate-200 rounded-xl">
    <div className="flex items-center justify-center w-12 h-12 mr-4 bg-orange-100 rounded-full">
      <Icon className="w-6 h-6 text-orange-600" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);

const OverviewTab = ({ customer }) => (
  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
    <StatCard
      icon={MdMoney}
      title="Total Received"
      value={`Rs. ${customer.totalSpent?.toFixed(2) || '0.00'}`}
    />

    <StatCard
      icon={DollarSign}
      title="Current Balanced"
      value={`Rs. ${customer.totalSpent?.toFixed(2) || '0.00'}`}
    />
   
    <StatCard
      icon={Calendar}
      title="Registered Date"
      value={customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
    />
  </div>
);

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-5 h-5 mt-1 text-slate-400" />
    <div>
      <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">{label}</p>
      <p className="text-sm text-slate-700">{value || 'N/A'}</p>
    </div>
  </div>
);

const DetailsTab = ({ customer }) => (
  <div className="p-6 bg-white border border-slate-200 rounded-xl">
    <h3 className="mb-6 text-lg font-semibold text-slate-800">Customer Information</h3>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <DetailItem icon={User} label="Full Name" value={customer.name} />
      <DetailItem icon={Mail} label="Email Address" value={customer.email} />
      <DetailItem icon={Phone} label="Phone" value={customer.phone} />
      <DetailItem icon={MapPin} label="Address" value={customer.address} />
    </div>
  </div>
);

const TransactionsTab = ({ customer }) => {
  const columns = [
    { header: 'Order ID', accessor: 'orderId' },
    { header: 'Date', accessor: 'date' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Status', accessor: 'status' },
  ];
  const transactions = customer.transactions || [];

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-xl">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">Transaction History</h3>
      {transactions.length > 0 ? (
        <Table columns={columns} data={transactions} />
      ) : (
        <div className="py-12 text-center text-slate-500">
          <Receipt size={40} className="mx-auto mb-2 text-slate-400" />
          <p className="font-semibold text-slate-600">No Transactions</p>
          <p className="text-sm">This customer hasn't made any purchases yet.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;