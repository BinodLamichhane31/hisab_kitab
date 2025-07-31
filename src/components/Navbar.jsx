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

  const NavLink = ({ href, children }) => (
    <li>
      <a href={href} className="relative font-medium transition-colors duration-300 text-slate-700 hover:text-orange-500 group">
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
      </a>
    </li>
  );

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-3 shadow-md bg-white/80 backdrop-blur-lg sm:px-8 md:px-16">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-auto h-12" />
        </Link>

        {user ? (
          <div className='flex items-center gap-4'>
            <div className='text-right'>
              <h1 className='font-semibold text-slate-800'>{user.fname} {user.lname}</h1>
              <p className='text-xs capitalize text-slate-500'>{user.role}</p>
            </div>
            <Link onClick={logout} className="px-5 py-2 text-sm font-semibold text-white transition duration-300 transform bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 hover:scale-105">
              Logout
            </Link>
          </div>
        ) : (
          <>
            <ul className="items-center hidden gap-8 text-md md:flex">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#benefits">Benefits</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </ul>
            
            <a onClick={openLogin} className="hidden px-5 py-2 text-sm font-semibold text-white transition duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-orange-500 to-amber-500 md:block hover:scale-105 hover:shadow-xl">
              Login
            </a>
            
            <Modal isOpen={isLoginOpen} onClose={closeLogin}>
              <LoginForm/>
            </Modal>
      
            <button className="text-3xl text-slate-700 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
            </button>
          </>
        )}
      </div>
      
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <ul className="flex flex-col gap-5 p-4 bg-white rounded-lg shadow-inner">
          <li><a href="#home" className='block text-slate-700 hover:text-orange-500' onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#features" className='block text-slate-700 hover:text-orange-500' onClick={() => setMenuOpen(false)}>Features</a></li>
          <li><a href="#benefits" className='block text-slate-700 hover:text-orange-500' onClick={() => setMenuOpen(false)}>Benefits</a></li>
          <li><a href="#contact" className='block text-slate-700 hover:text-orange-500' onClick={() => setMenuOpen(false)}>Contact</a></li>
          <li>
            <a href="#" className="block w-full px-5 py-2 mt-2 font-semibold text-center text-white bg-orange-500 rounded-full" onClick={() => { openLogin(); setMenuOpen(false); }}>
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;