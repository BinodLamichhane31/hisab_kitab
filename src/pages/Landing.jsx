import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import HighlightBanner from '../components/HighlightBanner';
import { AuthContext } from '../auth/authProvider';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [user]);
   
   return <>
      <HighlightBanner />
      <Navbar/>
      <Hero/>
      <Features/>
      <Benefits/>
      <ContactForm/>
      <Footer/>
    </>
  
};

export default Landing;
