import React from 'react';
import { useParams } from 'react-router-dom';
import CustomerList from '../../components/customers/CustomerList';
import CustomerDetail from '../../components/customers/CustomerDetail';

const CustomerManagementPage = () => {
  // Get the customerId from the URL, thanks to the nested route setup
  const { customerId } = useParams();
  console.log("Id",customerId);
  

  return (
    <div className="flex w-full h-full">
      {/* Left Pane: Customer List */}
      <div className="w-1/3 max-w-sm bg-white border-r border-gray-200">
        <CustomerList />
      </div>

      {/* Right Pane: Customer Details */}
      <div className="flex-1">
        <CustomerDetail customerId={customerId} />
      </div>
    </div>
  );
};

export default CustomerManagementPage;