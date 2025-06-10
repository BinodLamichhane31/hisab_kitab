import React from 'react';
import logo from '../assets/logo.png';


const Footer = () => (
  <footer id="footer" className="px-20 py-10 text-sm text-gray-600 bg-gray-50">
    <div className="flex flex-col justify-between md:flex-row">
      <div className='justify-items-center'>
        <img src={logo} alt="Logo" className="w-[60px] h-[30px]" />
        <p>Made in Nepal 🇳🇵 for Nepali businesses</p>
        <p className="mt-1 text-xs">Empowering local shops with modern tools.</p>
      </div>
      <div>
        <h4 className="font-semibold">Quick Links</h4>
        <ul>
          <a href="#home" className="block text-gray-500 hover:text-orange-500">Home</a>
          <a href="#features" className="block text-gray-500 hover:text-orange-500">Features</a>
          <a href="#benefits" className="block text-gray-500 hover:text-orange-500">Benefits</a>
          <a href="#contact" className="block text-gray-500 hover:text-orange-500">Contact</a>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">Connect With Us</h4>
        <p>Facebook</p>
        <p>Instagram</p>
      </div>
    </div>
    <p className="mt-8 text-xs text-center">© 2025 HisabKitab. All rights reserved.</p>
  </footer>
);

export default Footer;
