
import { useState, useEffect } from "react";
import { Building } from 'lucide-react';
import AddShopModal from "../../components/shop/AddShopModal";

const CreateFirstShop = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCreationSuccess = (newShop) => {
    if (newShop && newShop._id) {
      localStorage.setItem("currentShopId", newShop._id);
      window.location.href = '/dashboard';
    }
  };
  
  const handleCloseModal = () => {
      setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 space-y-6 text-center">
        <Building className="w-16 h-16 mx-auto text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-800">Welcome!</h1>
        <p className="mt-2 text-gray-600">Let's get your first shop set up to continue.</p>
        
        {!isModalOpen && (
       
            <button className="inline-flex items-center justify-center w-48 px-4 py-3 text-sm font-medium text-white transition-colors bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-ornage-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400" onClick={() =>setIsModalOpen(true)}>
              Create a Shop
            </button>
        )}
      </div>

      <AddShopModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreationSuccess={handleCreationSuccess}
      />
    </div>
  );
};

export default CreateFirstShop;