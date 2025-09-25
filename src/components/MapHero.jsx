import React from 'react'
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // delay between children
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const MapHero = () => {
  return (
    <div className="relative h-screen lg:max-h-[800px] max-h-[600px] bg-[url('/assets/hero.jpg')] bg-top bg-cover bg-no-repeat flex items-center justify-center pt-20">
          {/* Overlay */}
          <div className="absolute inset-0 bg-[rgba(38,41,77,0.7)]"></div>
    
          {/* Content */}
          <motion.div
            className="relative w-full flex justify-center items-center px-6 text-center text-white z-10"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="max-w-3xl" variants={container}>
              <motion.h2
                className="md:text-5xl text-4xl font-bold mb-4 uppercase"
                variants={item}
              >
                Locate Us
              </motion.h2>
              <motion.p className="mb-4 md:text-xl pt-5" variants={item}>
                Find Us ob google maps...
              </motion.p>
              <motion.p
                className="italic text-blue-200 lg:text-lg font-bold"
                variants={item}
              >
                All the Churches of Christ salute you (Romans 16:16)
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
  )
}

export default MapHero