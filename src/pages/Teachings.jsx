import React from 'react'
import Header from '../components/Header'
import TeachingHero from '../components/TeachingHero'
import TeachingList from '../components/TeachingList'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const Teachings = () => {
  return (
    <div>
      <Header isFixed />
      {/* <TeachingHero /> */}
      <div className="pt-20 mt-2">
        <TeachingList />
      </div>
      <CTA />
      <Footer />
    </div>
  )
}

export default Teachings
