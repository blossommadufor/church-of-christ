import React from 'react'
import SermonHero from '../components/SermonHero'
import SermonList from '../components/SermonList'
import Teachings from '../components/Teachings'
import Footer from '../components/Footer'

const Sermons = () => {
  return (
    <div>
      <SermonHero/>
      <SermonList/>
      {/* <Teachings/> */}
      <Footer/>
    </div>
  )
}

export default Sermons
