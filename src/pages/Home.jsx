import React from 'react'
import About from '../components/About'
import Activities from '../components/Activities'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Question from '../components/Question'
import Sermons from '../components/Sermons'
import AboutIcons from '../components/AboutIcons'
import Salvation from '../components/Salvation'


const Home = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <About/>
      <AboutIcons/>
      <Sermons/>
      <Activities/>
      <Salvation/>
      <Question/>
      <Footer/>
    </div>
  )
}

export default Home
