import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import sendMessageAnimation from '../assets/send_message.json';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlinePaperAirplane } from 'react-icons/hi';

const Contact = () => (
  <section id="contact" className="px-8 py-20 bg-white">
    <div className="max-w-screen-xl mx-auto text-center">
      <h2 className="text-3xl font-bold md:text-4xl text-slate-900">
        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Touch</span>
      </h2>
      <p className="max-w-2xl mx-auto mt-4 text-slate-600">
        Have a question or want to get started? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
    </div>

    <div className="max-w-screen-xl mx-auto mt-12 overflow-hidden bg-white rounded-lg shadow-2xl md:grid md:grid-cols-2">
      {/* COOL DESIGN: Left Side - Contact Info with a dark, premium feel */}
      <div className="p-8 text-white bg-slate-800 sm:p-12">
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p className="mt-2 text-slate-400">
              Fill up the form and our team will get back to you within 24 hours.
            </p>
            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <HiOutlinePhone className="w-6 h-6 mt-1 text-orange-400" />
                <span>+977 98XXXXXXXX</span>
              </li>
              <li className="flex items-start gap-4">
                <HiOutlineMail className="w-6 h-6 mt-1 text-orange-400" />
                <span>hello@hisabkitab.com</span>
              </li>
              <li className="flex items-start gap-4">
                <HiOutlineLocationMarker className="w-6 h-6 mt-1 text-orange-400" />
                <span>Kathmandu, Nepal</span>
              </li>
            </ul>
        </motion.div>
      </div>

      {/* COOL DESIGN: Right Side - Form with the Lottie Animation */}
      <motion.div
        className="p-8 sm:p-12"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Lottie animationData={sendMessageAnimation} className="w-full h-32" loop={true} />
        <form className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <input className="w-full p-3 transition duration-300 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Your Name" />
            <input className="w-full p-3 transition duration-300 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Phone Number" />
          </div>
          <input className="w-full p-3 transition duration-300 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Email Address" type="email" />
          <textarea className="w-full h-32 p-3 transition duration-300 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Your Message" />
          <button className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition duration-300 transform bg-orange-500 rounded-full shadow-lg hover:scale-105 hover:bg-orange-600">
            <span>Send Message</span>
            <HiOutlinePaperAirplane className="w-5 h-5"/>
          </button>
        </form>
      </motion.div>
    </div>
  </section>
);

export default Contact;