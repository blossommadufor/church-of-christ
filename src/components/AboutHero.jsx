import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const AboutHero = () => {
  return (
    <div
      className="relative bg-[url('/assets/hero.jpg')] bg-top bg-cover bg-no-repeat flex items-center justify-center pt-20 overflow-hidden"
      style={{ height: "800px", maxHeight: "800px" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(15,20,50,0.78)]" />

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
          Church of Christ, Nyanya
        </motion.p>
        <motion.h1
          className="text-4xl md:text-5xl xl:text-6xl lg:text-5xl font-semibold mb-6 xl:leading-[1.3]"
          variants={item}
        >
          We are Built on the Word and Rooted in Christ.
        </motion.h1>
        <motion.p
          className="text-gray-300 md:text-xl text-base leading-relaxed mb-8"
          variants={item}
        >
          A New Testament church committed to biblical truth, sincere worship,
          and faithful Christian living — in Nyanya and beyond.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={item}
        >
          <Link to="/contact">
            <button className="py-3 px-8 bg-light border-2 border-light text-white text-base font-semibold rounded-full hover:bg-blue-400 hover:border-blue-400 transition-all duration-300 shadow-lg hover:scale-105">
              Contact Us
            </button>
          </Link>
        </motion.div>
        <motion.p className="italic text-blue-300 mt-8 font-medium text-base" variants={item}>
          "All the Churches of Christ salute you." — Romans 16:16
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AboutHero;
