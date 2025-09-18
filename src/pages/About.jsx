import React from 'react'
import AboutHero from '../components/AboutHero'
import AboutContext from '../components/AboutContext'
import Leaders from '../components/Leader'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div>
      <AboutHero/>
      <AboutContext/>
      <Leaders/>
      <Footer/>
    </div>
  )
}

export default About
