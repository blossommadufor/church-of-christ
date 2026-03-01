import {
  faBookOpen,
  faBreadSlice,
  faHandHoldingHeart,
  faHandsPraying,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const worshipActs = [
  {
    icon: faMusic,
    title: "SINGING",
    verse: "Speaking to yourselves in psalms and hymns and spiritual songs, singing and making melody in your heart to the Lord.",
    ref: "Ephesians 5:19",
  },
  {
    icon: faHandsPraying,
    title: "PRAYING",
    verse: "Pray without ceasing.",
    ref: "1 Thessalonians 5:17",
  },
  {
    icon: faBreadSlice,
    title: "LORD'S SUPPER",
    verse: "This do in remembrance of me.",
    ref: "1 Corinthians 11:24",
  },
  {
    icon: faHandHoldingHeart,
    title: "GIVING",
    verse: "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.",
    ref: "2 Corinthians 9:7",
  },
  {
    icon: faBookOpen,
    title: "PREACHING",
    verse: "Preach the word; be instant in season, out of season.",
    ref: "2 Timothy 4:2",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AboutIcons = () => {
  return (
    <div className="relative bg-[url('/assets/hero2.jpeg')] bg-top bg-cover bg-no-repeat">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(15,20,50,0.90)]" />

      <div className="wrap relative z-10 py-16 lg:py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-14">
          {/* Left: tag + heading + description */}
          <div className="md:max-w-xl">
            <p className="text-blue-300 uppercase tracking-widest text-base font-bold mb-3">
              New Testament Church
            </p>
            <h2 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-white font-bold uppercase leading-tight mb-4">
              Join Us in Worship
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              We worship God in spirit and in truth, following the five acts of
              worship established in the New Testament — no more, no less.
            </p>
          </div>
          {/* Right: button */}
          <div className="flex items-center md:pt-14">
            <Link to="/beliefs">
              <button className="bg-light text-white py-3 px-6 rounded-3xl hover:bg-white hover:text-primary transition-all duration-300 font-semibold whitespace-nowrap">
                More About Us
              </button>
            </Link>
          </div>
        </div>

        {/* Five Acts of Worship — 3 top + 2 bottom centred */}
        <div className="flex flex-col gap-6">
          {/* Top row: 3 items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {worshipActs.slice(0, 3).map((act, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-5 border border-white/20 hover:border-light hover:bg-white/10 transition-all duration-300 rounded-lg"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="border-2 border-blue-300 w-16 h-16 flex justify-center items-center mb-4 rounded-lg hover:bg-light transition-colors duration-300">
                  <FontAwesomeIcon icon={act.icon} className="text-3xl text-blue-200" />
                </div>
                <p className="text-white font-bold tracking-wider text-base mb-3">{act.title}</p>
                <p className="text-gray-400 text-sm italic leading-relaxed">"{act.verse}"</p>
                <p className="text-blue-300 text-sm font-semibold mt-1">— {act.ref}</p>
              </motion.div>
            ))}
          </div>
          {/* Bottom row: 2 items — grid-cols-1 mobile, 2 centred on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:max-w-[calc(66.666%+12px)] sm:mx-auto">
            {worshipActs.slice(3).map((act, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-5 border border-white/20 hover:border-light hover:bg-white/10 transition-all duration-300 rounded-lg"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="border-2 border-blue-300 w-16 h-16 flex justify-center items-center mb-4 rounded-lg hover:bg-light transition-colors duration-300">
                  <FontAwesomeIcon icon={act.icon} className="text-3xl text-blue-200" />
                </div>
                <p className="text-white font-bold tracking-wider text-base mb-3">{act.title}</p>
                <p className="text-gray-400 text-sm italic leading-relaxed">"{act.verse}"</p>
                <p className="text-blue-300 text-sm font-semibold mt-1">— {act.ref}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutIcons;
