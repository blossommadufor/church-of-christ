import React from "react";
import { Link } from "react-router-dom";
import TeachingCard from "./TeachingCard";
import { motion } from "framer-motion";

const teachings = [
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

const Teachings = () => {
  return (
    <div id="teachings" className="bg-white py-20">
      <div className="wrap">
        {/* Section header row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 mb-12">
          <div>
            <p className="text-light uppercase tracking-widest text-base font-bold mb-1">
              Messages
            </p>
            <h2 className="text-secondary text-3xl md:text-4xl xl:text-5xl lg:text-4xl font-bold">
              RECENT TEACHINGS
            </h2>
          </div>
          <Link to="/teachings">
            <button className="py-2 px-5 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold text-base transition-all duration-200 whitespace-nowrap">
              View All →
            </button>
          </Link>
        </div>

        {/* Teaching cards grid */}
        <motion.div
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {teachings.map((item, index) => (
            <TeachingCard key={index} {...item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Teachings;
