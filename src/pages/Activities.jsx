import React from 'react'
import ActivitiesHero from '../components/ActivitiesHero'
import ActivitiesList from '../components/ActivitiesList'
import Footer from '../components/Footer'
import Header from '../components/Header'
import CTA from '../components/CTA'

const Activities = () => {
  return (
    <div>
      <Header />
      <ActivitiesHero />
      <ActivitiesList />
      <CTA />
      <Footer />
    </div>
  )
}

export default Activities
