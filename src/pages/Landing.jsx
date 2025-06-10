import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Landing = () => (
  <main className="realtive">
    <section className="xl:padding-l wide:padding-r padding-b"><Navbar /></section>
    <section className="xl:padding-l wide:padding-r padding-b"><Hero /></section>
    <section className="padding"><Features /></section>
    <section className="padding"><Benefits /></section>
    <section className="padding-x py-10"><ContactForm /></section>
    <section className="bg-white padding-x padding-t pb-8"><Footer /></section>
  </main>
  
);

export default Landing;
