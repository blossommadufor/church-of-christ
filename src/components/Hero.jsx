import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
};

const Hero = () => {
  return (
    <div
      id="home"
      className="relative h-screen min-h-[700px] bg-top bg-cover bg-no-repeat flex items-center justify-center overflow-hidden pt-20"
      style={{ backgroundImage: "url(/assets/church4.png)" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(15,20,50,0.72)]" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl text-center text-white px-6 md:px-16 lg:px-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Tag line */}
        <motion.p
          className="uppercase tracking-[0.3em] text-blue-300 text-sm md:text-base font-semibold mb-5"
          variants={item}
        >
          All the Churches of Christ salute you — Romans 16:16
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="md:text-5xl text-4xl xl:text-6xl lg:text-5xl font-semibold xl:leading-[1.3] mb-6"
          variants={item}
        >
          <span>Built on the Word.{" "}</span>
          <span className="text-blue-300">Rooted in Christ.</span>{" "}
          <span>Reaching the Lost.</span>
        </motion.h1>

        {/* Sub text */}
        <motion.p
          className="text-gray-300 md:text-xl text-base leading-relaxed max-w-2xl mx-auto mb-10"
          variants={item}
        >
          The Church of Christ, Nyanya — a community of believers committed to
          New Testament Christianity, worshipping God in spirit and in truth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-row gap-3 sm:gap-4 justify-center"
          variants={item}
        >
          <Link to="/about" className="flex-1 sm:flex-none">
            <button className="w-full py-3 px-2 sm:py-4 sm:px-8 bg-light border-2 border-light text-white text-sm sm:text-base md:text-lg font-semibold rounded-full hover:bg-blue-400 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-400/40 hover:scale-105 whitespace-nowrap">
              Learn More
            </button>
          </Link>
          <Link to="/contact" className="flex-1 sm:flex-none">
            <button className="w-full py-3 px-2 sm:py-4 sm:px-8 bg-white/10 border-2 border-white text-white text-sm sm:text-base md:text-lg font-semibold rounded-full hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm hover:scale-105 whitespace-nowrap">
              Contact Us
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
