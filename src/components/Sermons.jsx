import React from "react";
import { Link } from "react-router-dom";
import SermonCard from "./SermonCard";
import { motion } from "framer-motion";

const sermons = [
  {
    id: 1,
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    preacher: "Bro Tom Daniel",
    date: "Nov 21st 2024",
  },
  {
    id: 2,
    img: "/assets/sermons.jpg",
    title: "Walking by Faith and Not by Sight",
    preacher: "Bro Emeka Okafor",
    date: "Dec 8th 2024",
  },
  {
    id: 3,
    img: "/assets/sermons.jpg",
    title: "The Power of the Blood of Jesus Christ",
    preacher: "Bro Samuel Adeyemi",
    date: "Jan 5th 2025",
  },
];

const Sermons = () => {
  return (
    <div id="sermons" className="bg-white py-20">
      <div className="wrap">
        {/* Section header row */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-light uppercase tracking-widest text-base font-bold mb-1">
              Messages
            </p>
            <h2 className="text-secondary text-3xl md:text-4xl xl:text-5xl lg:text-4xl font-bold">
              RECENT SERMONS
            </h2>
          </div>
          <Link to="/sermons">
            <button className="py-2 px-5 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold text-base transition-all duration-200 whitespace-nowrap">
              View All →
            </button>
          </Link>
        </div>

        {/* Sermon cards grid */}
        <motion.div
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {sermons.map((item, index) => (
            <SermonCard key={index} {...item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Sermons;
