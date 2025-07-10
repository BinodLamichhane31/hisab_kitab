// components/dashboard/ShopSwitcher.jsx
import { useContext } from "react";
import { Store, ChevronsUpDown } from "lucide-react";
import { AuthContext } from "../../auth/authProvider";

const ShopSwitcher = () => {
  const { shops, currentShop, switchShop, loading } = useContext(AuthContext);

  if (loading || !currentShop) {
    // Show a loading or placeholder state
    return (
      <div className="flex items-center p-2 text-sm text-gray-500 bg-gray-200 rounded-md animate-pulse">
        <Store className="mr-2" size={20} />
        <span>Loading Shop...</span>
      </div>
    );
  }

  if (shops.length === 0) {
    // This case should ideally not be reached if navigation logic is correct, but it's a good fallback.
    return null;
  }

  const handleShopChange = (e) => {
    const newShopId = e.target.value;
    if (newShopId !== currentShop._id) {
      switchShop(newShopId);
    }
  };

  return (
    <div className="relative flex items-center mr-4">
      <Store className="absolute text-gray-500 left-3" size={20} />
      <select
        value={currentShop._id}
        onChange={handleShopChange}
        className="w-full max-w-xs py-2 pl-10 pr-8 font-semibold text-gray-800 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
        aria-label="Select a shop"
      >
        {shops.map((shop) => (
          <option key={shop._id} value={shop._id}>
            {shop.name}
          </option>
        ))}
      </select>
      <ChevronsUpDown className="absolute text-gray-500 pointer-events-none right-3" size={20} />
    </div>
  );
};

export default ShopSwitcher;