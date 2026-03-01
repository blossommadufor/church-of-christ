import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const ActivitiesHero = () => {
  return (
    <div className="relative max-h-[680px] bg-[url('/assets/hero2.jpeg')] bg-top bg-cover bg-no-repeat flex items-center justify-center pt-20 overflow-hidden" style={{ height: '680px' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(15,20,50,0.75)]" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-6 max-w-3xl"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="uppercase tracking-[0.3em] text-blue-300 text-base font-semibold mb-5"
          variants={item}
        >
          Life Together
        </motion.p>
        <motion.h1
          className="text-4xl md:text-5xl xl:text-6xl lg:text-5xl font-semibold mb-6 leading-[1.15]"
          variants={item}
        >
          Church Activities
        </motion.h1>
        <motion.p
          className="text-gray-300 md:text-xl text-base leading-relaxed"
          variants={item}
        >
          We grow together through worship, study, fellowship, and service. Here
          is everything happening at the Church of Christ, Nyanya.
        </motion.p>
        <motion.p
          className="italic text-blue-300 mt-6 font-medium"
          variants={item}
        >
          "And let us consider one another in order to stir up love and good
          works." — Hebrews 10:24
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ActivitiesHero;
