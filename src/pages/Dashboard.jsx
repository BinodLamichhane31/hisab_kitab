import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { AuthContext } from '../auth/authProvider'

function Dashboard() {
    const {user,logout} = useContext(AuthContext)
    const role = user.role === 'admin' ? "Admin" : "User"
    // const handleLogout = () => {
    //     logout(); 
    //     window.location.reload()
    // };
    const logoutTest = () => {
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");   
      window.location.reload() 
  };
  
  return (
    <div className='items-center p-10'>
    <h1>{role} Dashboard</h1>
    <button onClick={logoutTest} className="px-4 py-2 text-sm font-semibold text-white transition bg-orange-500 rounded-md md:block hover:bg-orange-600">Logout</button>
    </div>
  )
}

export default Dashboard