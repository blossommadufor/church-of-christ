import React from 'react'
import About from '../components/About'
import Activities from '../components/Activities'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Sermons from '../components/Sermons'
import AboutIcons from '../components/AboutIcons'
import Salvation from '../components/Salvation'
import CTA from '../components/CTA'


const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Salvation />
      <Sermons />
      <AboutIcons />
      <Activities />
      <CTA />
      <Footer />
    </div>
  )
}

export default Home
