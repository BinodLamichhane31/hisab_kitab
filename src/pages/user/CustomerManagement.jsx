// pages/CustomersPage.jsx (Example)
import { useContext } from 'react';
import { AuthContext } from '../../auth/authProvider';
import { useGetCustomersByShop } from '../../hooks/useCustomer';

const CustomerManagement = () => {
    const { currentShop } = useContext(AuthContext);

    console.log(currentShop);
    
    
    // The hook will only run if `currentShop?._id` is available.
    // The `enabled` option in your useQuery is doing this work.
    const { data: customerData, isLoading, isError } = useGetCustomersByShop({ 
        shopId: currentShop?._id 
    });

    if (isLoading) return <div>Loading customers...</div>;
    if (isError) return <div>Error fetching customers.</div>;

    return (
        <div>
            <h1>Customers for {currentShop?.name}</h1>
            <ul>
              {customerData}
                {/* {customerData?.data.map(customer => (
                    <li key={customer._id}>{customer.name}</li>
                ))} */}
            </ul>
        </div>
    );
};

export default CustomerManagement