import React from 'react'
import ActivitiesList from '../components/ActivitiesList'
import Footer from '../components/Footer'
import Header from '../components/Header'
import CTA from '../components/CTA'

const Activities = () => {
  return (
    <div>
      <Header isFixed />
      {/* <ActivitiesHero /> */}
      <div className="pt-20 mt-2">
        <ActivitiesList />
      </div>
      <CTA />
      <Footer />
    </div>
  )
}

export default Activities
