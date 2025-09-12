import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slides = [
  { img: "/assets/slide1.jpg",
    text: "And he said unto them, Go ye into all the world, and preach the gospel to every creature.",
    passage: "~ Mark 16:15"
  },

  { img: "/assets/slide2.jpg", 
    text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    passage: "~ Matthew 6:33"
  },

  { img: "/assets/slide3.jpg", 
    text: "I am the Lord, and there is no other; apart from Me there is no God",
    passage: "~ Isaiah 45:5" 
  },
  { img: "/assets/about2.jpg", 
    text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest",
    passage: "~ Joshua 1:9" 
  },
];

const about = [
  {
    icon: "/assets/wedding.svg",
    title: "Evangelism to the World",
    text: "The Church of Christ fulfills Christ’s command to preach the gospel to all nations, bringing souls to salvation through His Word.",
  },
  {
    icon: "/assets/pray.svg",
    title: "Benevolence to the Saints",
    text: "We follow the apostolic example of caring for fellow believers in need, showing the love of Christ through service",
  },
  {
    icon: "/assets/bird.svg",
    title: "Edification of the Saints",
    text: "The Church is built up through teaching, fellowship, and worship, strengthening every member to grow in Christ.",
  },
];

// Animation settings
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="about" className="flex flex-col gap-20 px-8 md:px-10 lg:px-16 py-10 lg:py-20">
      {/* top features */}
      <div className="grid md:grid-cols-3 gap-10">
        {about.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center py-6 gap-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-light w-24 rounded-full">
              <img src={item.icon} alt="" />
            </div>
            <div>
              <h3 className="lg:text-3xl text-xl font-semibold pb-3 text-primary">
                {item.title}
              </h3>
              <p className=" text-gray-800">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* main about section */}
      <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
        {/* LEFT: text */}
        <motion.div
          className="flex-1 flex flex-col justify-center md:w-3/6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="lg:text-5xl text-3xl text-primary font-semibold pb-10">
            A Church that Loves God and People
          </h2>
          <p className="mb-6  text-gray-800">
            We are dedicated to spreading the Word and building a strong
            community of believers. Our mission is to inspire faith, hope, and
            love through God's word and practical fellowship.
            <br />
            <br />
            We have only one doctrine which is The Doctrine of Christ. We solely
            believe in the Bible as it is the authoritative source of God's
            spoken Word. We have only ONE belief which is based solely on the
            Bible. We speak where the Bible speaks and are silent where the
            Bible is silent.
          </p>
          <div>
            <a href="/about">
              <button className="bg-light text-white  py-2 px-6 rounded-3xl">
                More about us
              </button>
            </a>
          </div>
        </motion.div>

        {/* RIGHT: slider */}
        <motion.div
          className="relative md:w-3/6 h-[500px] overflow-hidden  shadow-lg"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {slides.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col transition-opacity duration-1000 ease-in-out ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="h-[65%] w-full">
                <img
                  src={item.img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[35%] w-full bg-primary text-white p-6">
                <p className="font-bold italic text-lg pb-3">{item.text}</p>
                <p className="">{item.passage}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
