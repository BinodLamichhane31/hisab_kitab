import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Benefits from './components/Benefits'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import HighlightBanner from './components/HighlightBanner'

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }


  return (
    <>
      <HighlightBanner />
      <Navbar/>
      <Hero/>
      <Features/>
      <Benefits/>
      <ContactForm/>
      <Footer/>
    </>
  )
}

export default App
