import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faBookOpen,
  faUsers,
  faChurch,
} from "@fortawesome/free-solid-svg-icons";

const activities = [
  {
    icon: faChurch,
    activity: "Sunday Worship",
    description: "Join us every Lord's Day as we gather to worship God in spirit and in truth through singing, praying, the Lord's Supper, giving, and the preaching of His Word.",
    date: "Every Sunday",
    time: "9:00AM – 12:00PM",
    color: "bg-blue-500",
  },
  {
    icon: faBookOpen,
    activity: "Thursday Bible Study",
    description: "A mid-week study of the Scriptures open to all members and visitors. We dig deeper into God's Word together to strengthen our faith and understanding.",
    date: "Every Thursday",
    time: "6:00PM – 7:00PM",
    color: "bg-indigo-500",
  },
  {
    icon: faUsers,
    activity: "Youth Class",
    description: "A dedicated class for the youth of the congregation, guiding the next generation in the ways of the Lord through sound teaching and fellowship.",
    date: "Every Tuesday",
    time: "6:00PM – 7:00PM",
    color: "bg-violet-500",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Activities = () => {
  return (
    <div className="bg-white py-24 lg:py-32">
      <div className="wrap">
        {/* Section header row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 mb-12">
          <div>
            <p className="text-light uppercase tracking-widest text-base font-bold mb-1">
              Schedule
            </p>
            <h2 className="text-primary text-3xl md:text-4xl xl:text-5xl lg:text-4xl font-bold uppercase">
              Church Activities
            </h2>
          </div>
          <Link to="/activities">
            <button className="py-2 px-5 rounded-full border-2 border-light text-light hover:bg-light hover:text-white font-semibold text-base transition-all duration-200 whitespace-nowrap">
              View More →
            </button>
          </Link>
        </div>

        {/* Activity Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {activities.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              {/* Color accent bar */}
              <div className={`${item.color} h-2 w-full`} />

              <div className="p-6 flex flex-col gap-4">
                {/* Icon + Title */}
                <div className="flex items-center gap-4">
                  <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <FontAwesomeIcon icon={item.icon} className="text-white text-xl" />
                  </div>
                  <h3 className="text-primary text-lg font-bold leading-tight">
                    {item.activity}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-base leading-relaxed">
                  {item.description}
                </p>

                {/* Date & Time */}
                <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-500 text-base">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-light w-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-base">
                    <FontAwesomeIcon icon={faClock} className="text-light w-4" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
