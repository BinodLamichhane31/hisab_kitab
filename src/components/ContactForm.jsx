import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations/motions';
import send from '../assets/send_message.json';

const ContactForm = () => (
  <section id="contact" className="px-8 py-16">
    <h2 className="mb-8 text-2xl font-bold text-center text-black">Get in <span className="text-orange-500">Touch</span></h2>
    <motion.form 
          className="grid max-w-4xl gap-4 p-6 mx-auto border rounded shadow-sm"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
    >
      <Lottie animationData={send} className="w-full h-40" loop={true} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input className="p-2 bg-white border rounded" placeholder="Your Name" />
            <input className="p-2 bg-white border rounded" placeholder="Phone Number" />
      </div>
      <input className="p-2 bg-white border rounded" placeholder="Email Address" />
      <textarea className="h-32 p-2 bg-white border rounded" placeholder="Message" />
      <button className="px-4 py-2 mx-auto text-white bg-orange-500 rounded w-fit">Send Message</button>
    </motion.form>
  </section>
  
);

export default ContactForm;
