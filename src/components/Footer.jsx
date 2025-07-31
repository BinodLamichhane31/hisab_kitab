import React from 'react';
import logo from '../assets/logo.png';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => (
  <footer id="footer" className="px-8 py-12 text-gray-400 bg-slate-900 sm:px-16">
    <div className="grid max-w-screen-xl gap-10 mx-auto md:grid-cols-4">
      <div className="md:col-span-1">
        <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 p-1 bg-white rounded-md" />
            <span className="text-xl font-bold text-white">HisabKitab</span>
        </div>
        <p className="mt-4 text-sm">Made with ❤️ in Nepal 🇳🇵 for Nepali businesses.</p>
        <p className="mt-2 text-xs">Empowering local shops with modern tools.</p>
      </div>

      <div>
        <h4 className="font-semibold text-white">Quick Links</h4>
        <ul className="mt-4 space-y-2">
          <li><a href="#home" className="transition-colors hover:text-orange-400">Home</a></li>
          <li><a href="#features" className="transition-colors hover:text-orange-400">Features</a></li>
          <li><a href="#benefits" className="transition-colors hover:text-orange-400">Benefits</a></li>
          <li><a href="#contact" className="transition-colors hover:text-orange-400">Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-white">Legal</h4>
        <ul className="mt-4 space-y-2">
          <li><a href="#" className="transition-colors hover:text-orange-400">Privacy Policy</a></li>
          <li><a href="#" className="transition-colors hover:text-orange-400">Terms of Service</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold text-white">Connect With Us</h4>
        <div className="flex mt-4 space-x-4">
          <a href="#" className="text-gray-400 transition-colors hover:text-orange-400"><FaFacebook size={24} /></a>
          <a href="#" className="text-gray-400 transition-colors hover:text-orange-400"><FaInstagram size={24} /></a>
          <a href="#" className="text-gray-400 transition-colors hover:text-orange-400"><FaTwitter size={24} /></a>
        </div>
      </div>
    </div>
    
    <div className="pt-8 mt-10 text-xs text-center border-t border-slate-700">
      <p>© {new Date().getFullYear()} HisabKitab. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;