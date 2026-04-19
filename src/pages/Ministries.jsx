import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTA from "../components/CTA";

// Currently mapping generic placeholder images as requested.
// Can swap for real asset paths when available.
const MINISTRIES = [
  {
    name: "Evangelism",
    description: "Reaching out to our community with the good news of Christ.",
    image: "/assets/preaching.jpg"
  },
  {
    name: "Sisters",
    description: "Empowering women through fellowship, study, and service.",
    image: "/assets/sisters.jpg"
  },
  {
    name: "Youth",
    description: "Guiding the next generation of believers in faith and leadership.",
    image: "/assets/youth.jpg"
  },
  {
    name: "Children",
    description: "Laying the biblical foundation for our youngest members.",
    image: "/assets/children.jpg"
  },
  {
    name: "Singing",
    description: "Leading the congregation in uplifting, a cappella praise.",
    image: "/assets/singing.jpg"
  },
  {
    name: "Welfare",
    description: "Caring for the physical and emotional needs of our church family.",
    image: "/assets/question.jpg"
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

const Ministries = () => {
  return (
    <div>
      {/* Header logic must be Fixed like the Donation page to skip the hero image entirely */}
      <Header isFixed />

      <div className="pt-32 pb-24 px-4 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Page Intro Block */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.h1
              className="text-primary xl:text-5xl lg:text-4xl md:text-4xl text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Ministries
            </motion.h1>
            <motion.p
              className="text-gray-600 md:text-lg text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The Church is a body with many parts, and every member has a role to play.
              Explore our ministries below to see how we organize our efforts to serve God,
              support one another, and reach our community.
            </motion.p>
          </div>

          {/* Ministry Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {MINISTRIES.map((ministry, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-in-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${ministry.image})` }}
                />

                {/* Dark Overlay Gradient - Fades out slightly on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-colors duration-500 group-hover:from-black/80 group-hover:via-black/20 group-hover:to-transparent" />

                {/* Content block - bottom left */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white text-left transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-2 tracking-wide uppercase">
                    {ministry.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-[85%] opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    {ministry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      <CTA />
      <Footer />
    </div>
  );
};

export default Ministries;
