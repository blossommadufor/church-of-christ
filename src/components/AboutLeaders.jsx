import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

// Reusable leadership card — accepts image and name
const LeadershipItem = ({ img, name, index }) => (
    <motion.div
        className="flex flex-col items-center text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: index * 0.08 }}
        viewport={{ once: true }}
    >
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden mb-4 shadow-md">
            <img
                src={img}
                alt={name}
                className="w-full h-full object-cover object-top"
            />
        </div>
        <p className="text-primary font-semibold text-base">{name}</p>
    </motion.div>
);

const elders = [
    { name: "Bro. Hart Emeribe", img: "/assets/hero.jpg" },
    { name: "Bro. Jacob Achobe", img: "/assets/hero.jpg" },
    { name: "Bro. Augustine Ohaju", img: "/assets/hero.jpg" },
    { name: "Bro. Ntewo Bassey", img: "/assets/hero.jpg" },
    { name: "Bro. Udoma Inyang", img: "/assets/hero.jpg" },
];

const deacons = [
    { name: "Bro. Efiong Anwana", img: "/assets/hero.jpg" },
    { name: "Bro. Felix Ajunwa", img: "/assets/hero.jpg" },
    { name: "Bro. George Attah", img: "/assets/hero.jpg" },
    { name: "Bro. Emana Bassey", img: "/assets/hero.jpg" },
    { name: "Bro. Donald Esiet", img: "/assets/hero.jpg" },
];

const AboutLeaders = () => {
    return (
        <div className="bg-white py-20">
            <div className="wrap">

                {/* ── Elders ── */}
                <div className="mb-32">
                    <div className="mb-12 text-center">
                        <p className="text-light uppercase tracking-widest text-base font-bold mb-3">
                            Spiritual Leadership
                        </p>
                        <h2 className="text-primary text-3xl md:text-4xl xl:text-5xl lg:text-4xl font-semibold">
                            Meet the Elders
                        </h2>
                    </div>

                    {/* 3 top */}
                    <div className="max-w-[640px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center mb-12">
                        {elders.slice(0, 3).map((elder, i) => (
                            <LeadershipItem key={i} name={elder.name} img={elder.img} index={i} />
                        ))}
                    </div>
                    {/* 2 bottom — centred */}
                    <div className="flex justify-center gap-5 flex-wrap">
                        {elders.slice(3).map((elder, i) => (
                            <LeadershipItem key={i} name={elder.name} img={elder.img} index={i + 3} />
                        ))}
                    </div>
                </div>

                {/* ── Deacons ── */}
                <div>
                    <div className="mb-12 text-center">
                        <p className="text-light uppercase tracking-widest text-base font-bold mb-3">
                            Service & Ministry
                        </p>
                        <h2 className="text-primary text-3xl md:text-4xl xl:text-5xl lg:text-4xl font-semibold">
                            Meet the Deacons
                        </h2>
                    </div>
                    {/* 3 top */}
                    <div className="max-w-[640px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center mb-12">
                        {deacons.slice(0, 3).map((deacon, i) => (
                            <LeadershipItem key={i} name={deacon.name} img={deacon.img} index={i} />
                        ))}
                    </div>
                    {/* 2 bottom — centred */}
                    <div className="flex justify-center gap-5 flex-wrap">
                        {deacons.slice(3).map((deacon, i) => (
                            <LeadershipItem key={i} name={deacon.name} img={deacon.img} index={i + 3} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutLeaders;
