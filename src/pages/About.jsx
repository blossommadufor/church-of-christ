import React from 'react'
import Header from '../components/Header'
import AboutHero from '../components/AboutHero'
import AboutWhoWeAre from '../components/AboutWhoWeAre'
import AboutBeliefs from '../components/AboutBeliefs'
import AboutLeaders from '../components/AboutLeaders'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div>
      <Header />
      <AboutHero />
      <AboutWhoWeAre />
      <AboutBeliefs />
      <AboutLeaders />
      <CTA />
      <Footer />
    </div>
  )
}

export default About
