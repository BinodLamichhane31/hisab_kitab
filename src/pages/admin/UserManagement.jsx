import { PlusCircle } from 'lucide-react';


const UserManagement = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="mt-2 text-gray-600">Users</p>
        </div>
        <button className="flex items-center px-4 py-2 font-bold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
          <PlusCircle size={20} className="mr-2" />
          Add User
        </button>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-sm">
        <input 
          type="text" 
          placeholder="Search by name or email..."
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <div className="py-8 text-center text-gray-500">
        </div>
      </div>
    </div>
  );
};
export default UserManagement;