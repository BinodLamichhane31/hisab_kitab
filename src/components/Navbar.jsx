import React, { useState, useCallback, useContext } from 'react';
import logo from '../assets/logo.png';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import Modal from './Modal';
import LoginForm from './LoginForm';
import { AuthContext } from '../auth/authProvider';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  
  const openLogin = useCallback(() => setLoginOpen(true), []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  const { user, logout } = useContext(AuthContext);

  


  return (
    <nav className="sticky top-0 z-50 px-4 py-3 shadow-sm bg-gray-50 sm:px-8 md:px-16">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-16 h-auto md:w-20" />

        {
            user && (
              <div className='flex gap-6'>
                <div>
                  <h1>{user.fname+" "+user.lname}</h1>
                  <p>{user.role}</p>
                </div>
              

              <Link onClick={logout} className="hidden px-4 py-2 text-sm font-semibold text-white transition bg-orange-500 rounded-md md:block hover:bg-orange-600">
                Logout
              </Link>
              </div>
            )
        } 

        {!user && (<>

        {/* Desktop Nav */}
        <ul className="items-center hidden gap-8 font-medium text-gray-700 text-md md:flex">
          <li><a href="#home" className="text-black transition text-md hover:text-orange-500">Home</a></li>
          <li><a href="#features" className="text-black transition hover:text-orange-500">Features</a></li>
          <li><a href="#benefits" className="text-black transition hover:text-orange-500">Benefits</a></li>
          <li><a href="#contact" className="text-black transition hover:text-orange-500">Contact</a></li>
        </ul>
        

        {/* Login Button (Desktop) */}
        <a onClick={openLogin} href="#" className="hidden px-4 py-2 text-sm font-semibold text-white transition bg-orange-500 rounded-md md:block hover:bg-orange-600">
          Login
        </a>
        
        <Modal isOpen={isLoginOpen} onClose={closeLogin}>
        <LoginForm/>
      </Modal>
      
      

        {/* Hamburger Menu (Mobile) */}
        <button
          className="text-orange-500 bg-transparent md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
        </>)}
      </div>
      

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-4 text-sm font-medium text-gray-700">
          <li><a href="#home" className='text-black hover:text-orange-500' onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#features" className='text-black hover:text-orange-500' onClick={() => setMenuOpen(false)}>Features</a></li>
          <li><a href="#benefits" className='text-black hover:text-orange-500' onClick={() => setMenuOpen(false)}>Benefits</a></li>
          <li><a href="#contact" className='text-black hover:text-orange-500' onClick={() => setMenuOpen(false)}>Contact</a></li>
          <li>
            <a
              href="#"
              className="font-bold text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
