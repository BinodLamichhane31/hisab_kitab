import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero'; 
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import Contact from '../components/Contact'; 
import Footer from '../components/Footer';
import HighlightBanner from '../components/HighlightBanner';

const Landing = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      <HighlightBanner />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Benefits />
        <Contact /> 
      </main>
      <Footer />
    </div>
  );
};

export default Landing;