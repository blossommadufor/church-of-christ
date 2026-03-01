import React from 'react'
import Header from '../components/Header'
import SermonHero from '../components/SermonHero'
import SermonList from '../components/SermonList'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const Sermons = () => {
  return (
    <div>
      <Header />
      <SermonHero />
      <SermonList />
      <CTA />
      <Footer />
    </div>
  )
}

export default Sermons
