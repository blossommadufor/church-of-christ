import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const slides = [
  {
    title: "The Church Of Christ Nyanya",
    text:
      "Welcome to the official web directory of the church! Here, you'll find inspiring sermons, heartfelt teachings from our leaders. We’re glad you're here feel free to explore and be encouraged.",
    verse: "...all the Churches of Christ salute you (Romans 16:16)",
  },
  {
    title: "2The Church Of Christ Nyanya",
    text: "This is the official web directory of the church...",
    verse: "...all the Churches of Christ salute you (Romans 16:16)",
  },
  {
    title: "3The Church Of Christ Nyanya",
    text: "This is the official web directory of the church...",
    verse: "...all the Churches of Christ salute you (Romans 16:16)",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
};

const AUTO_DELAY_MS = 5000;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    resetInterval();
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_DELAY_MS);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      id="home"
      className="relative h-screen lg:max-h-[800px] max-h-[600px] bg-[url('/assets/hero.jpg')] bg-top bg-cover bg-no-repeat flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(38,41,77,0.7)]"></div>

      {/* Text content */}
      <motion.div
        key={current}
        className="max-w-3xl text-center text-white relative z-10 md:px-24 px-20 lg:px-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="lg:text-5xl text-3xl font-bold mb-4" variants={item}>
          {slides[current].title}
        </motion.h2>

        <motion.p className="mb-4 md:text-xl pt-5" variants={item}>
          {slides[current].text}
        </motion.p>

        <motion.p className="italic text-blue-300 lg:text-lg font-bold" variants={item}>
          {slides[current].verse}
        </motion.p>
      </motion.div>

      {/* Left Arrow */}
      <button
        onClick={goPrev}
        className="absolute left-7 lg:left-20 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-20 md:w-12 md:h-12 w-10 flex items-center justify-center h-10"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-3 text-primary text-2xl" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goNext}
        className="absolute right-7 lg:right-20 top-1/2 -translate-y-1/2 hover:bg-white/40 bg-white/20 text-white p-3 rounded-full z-20 md:w-12 md:h-12 w-10 flex items-center justify-center h-10"
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-3 text-primary text-2xl" />
      </button>
    </div>
  );
};

export default Hero;




