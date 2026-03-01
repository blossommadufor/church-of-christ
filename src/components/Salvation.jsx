import {
  faBookOpen,
  faCross,
  faDroplet,
  faHandsPraying,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";

const steps = [
  {
    step: 1,
    icon: faHeadphones,
    title: "Hear the Gospel",
    text: "Salvation begins with hearing the Word of God. The gospel is the power of God unto salvation for all who believe.",
    verse: '"Faith cometh by hearing, and hearing by the word of God." — Romans 10:17',
  },
  {
    step: 2,
    icon: faHandsPraying,
    title: "Believe",
    text: "We must believe that Jesus is the Son of God who died for our sins and rose again on the third day.",
    verse: '"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish." — John 3:16',
  },
  {
    step: 3,
    icon: faCross,
    title: "Repent",
    text: "Repentance is a turning away from sin and a turning toward God with a sincere desire to live for Him.",
    verse: '"Repent ye therefore, and be converted, that your sins may be blotted out." — Acts 3:19',
  },
  {
    step: 4,
    icon: faBookOpen,
    title: "Confess Christ",
    text: "With the heart one believes unto righteousness, and with the mouth confession is made unto salvation.",
    verse: '"With the mouth confession is made unto salvation." — Romans 10:10',
  },
  {
    step: 5,
    icon: faDroplet,
    title: "Be Baptized",
    text: "Baptism by immersion in water is for the remission of sins. It is the point at which God washes away our sins and adds us to His church.",
    verse: '"Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins." — Acts 2:38',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Salvation = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Section title (sticky feel) */}
          <motion.div
            className="lg:sticky lg:top-28 flex flex-col justify-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-light uppercase tracking-widest text-base font-bold mb-4">
              The Plan of Salvation
            </p>
            <h2 className="text-primary xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-extrabold uppercase leading-tight">
              The Five Steps To Salvation
            </h2>
            <div className="mt-6 w-16 h-1.5 bg-light rounded-full" />
            <p className="mt-6 text-gray-600 leading-relaxed">
              God's plan for restoring man to fellowship with Him is clearly laid
              out in the New Testament. These five steps are not the invention of
              any church or creed — they are drawn entirely from the Bible.
            </p>
          </motion.div>

          {/* RIGHT: Step boxes in nested grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-3 text-left ${index === 4 ? "col-span-1 sm:col-span-2" : "col-span-1"
                  }`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Icon + Step number */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-primary text-lg"
                    />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-light">
                    Step {item.step}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-primary text-xl font-bold">{item.title}</h3>

                {/* Text */}
                <p className="text-gray-600 text-base leading-relaxed">{item.text}</p>

                {/* Verse */}
                <p className="italic text-sm text-blue-600 font-medium border-l-4 border-blue-300 pl-3 mt-auto pt-2">
                  {item.verse}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salvation;