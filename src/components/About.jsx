import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slides = [
  {
    img: "/assets/slide1.jpg",
    text: "And he said unto them, Go ye into all the world, and preach the gospel to every creature.",
    passage: "~ Mark 16:15",
  },
  {
    img: "/assets/slide2.jpg",
    text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    passage: "~ Matthew 6:33",
  },
  {
    img: "/assets/slide3.jpg",
    text: "I am the Lord, and there is no other; apart from Me there is no God",
    passage: "~ Isaiah 45:5",
  },
  {
    img: "/assets/hero.jpg",
    text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.",
    passage: "~ Joshua 1:9",
  },
];

const about = [
  {
    icon: "/assets/bird.svg",
    title: "Edification",
    text: "The Church is built up through sound teaching, sincere fellowship, and faithful worship. We are committed to growing together in the grace and knowledge of our Lord Jesus Christ.",
    verse: '"...things wherewith one may edify another." — Romans 14:19',
  },
  {
    icon: "/assets/wedding.svg",
    title: "Evangelism",
    text: "We fulfil Christ's Great Commission by going into all the world to preach the gospel of salvation. Every soul matters, and we are committed to reaching the lost through the power of God's Word.",
    verse: '"Go ye into all the world, and preach the gospel to every creature." — Mark 16:15',
  },
  {
    icon: "/assets/pray.svg",
    title: "Benevolence",
    text: "Following the apostolic example, we care for fellow believers and our wider community. We show the love of Christ in practical ways — meeting needs, extending mercy, and bearing one another's burdens.",
    verse: '"Bear ye one another\'s burdens, and so fulfil the law of Christ." — Galatians 6:2',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="about" className="wrap flex flex-col gap-20 py-10 lg:py-20">
      {/* Main about section */}
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
          {/* Subtitle tag */}
          <p className="text-light uppercase tracking-widest text-base font-bold mb-3">
            Who We Are
          </p>
          <h2 className="xl:text-5xl lg:text-4xl text-3xl text-primary font-medium lg:leading-[1.4] pb-8">
            A Church that Loves God and People
          </h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            We are dedicated to spreading the Word and building a strong
            community of believers. Our mission is to inspire faith, hope, and
            love through God's word and practical fellowship.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We have only one doctrine — the Doctrine of Christ. We believe the
            Bible is the sole authoritative source of God's spoken Word. We
            speak where the Bible speaks and are silent where the Bible is
            silent.
          </p>
        </motion.div>

        {/* RIGHT: slider */}
        <motion.div
          className="relative md:w-3/6 h-[500px] overflow-hidden shadow-lg border border-gray-200 rounded-lg"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {slides.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <div className="lg:h-[70%] h-[65%] w-full">
                <img
                  src={item.img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:h-[30%] h-[35%] w-full bg-light text-white p-6">
                <p className="font-bold italic text-lg pb-3">{item.text}</p>
                <p>{item.passage}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Work of the church — 3 items */}
      <div className="grid md:grid-cols-3 gap-10">
        {about.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-start text-left py-6 px-2 gap-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-light w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0">
              <img src={item.icon} alt="" className="w-10" />
            </div>
            <div>
              <h3 className="lg:text-2xl text-xl font-bold pb-2 text-primary">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">{item.text}</p>
              <p className="italic text-base text-blue-600 font-medium border-l-4 border-blue-300 pl-3">
                {item.verse}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
