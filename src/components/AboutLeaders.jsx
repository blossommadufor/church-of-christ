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
        <div className="w-[230px] h-[230px] rounded-full overflow-hidden mb-4 shadow-md">
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
    { name: "Bro. Hart Emeribe", img: "/assets/emeribe.png" },
    { name: "Bro. Jacob Achobe", img: "/assets/achobe.png" },
    { name: "Bro. Augustine Ohaju", img: "/assets/ohaju.png" },
    { name: "Bro. Ntewo Bassey", img: "/assets/ntewo.png" },
    { name: "Bro. Udoma Inyang", img: "/assets/udoma.png" },
];

const deacons = [
    { name: "Bro. Efiong Anwana", img: "/assets/anwana.png" },
    { name: "Bro. Felix Ajunwa", img: "/assets/ajunwa.png" },
    { name: "Bro. George Attah", img: "/assets/attah.png" },
    { name: "Bro. Emana Bassey", img: "/assets/emana.png" },
    { name: "Bro. Donald Esiet", img: "/assets/welfare.jpg" },
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

                    {/* <div className="max-w-[800px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-12">
                        {elders.slice(0, 3).map((elder, i) => (
                            <LeadershipItem key={i} name={elder.name} img={elder.img} index={i} />
                        ))}
                    </div>
                    <div className="flex justify-center gap-5 flex-wrap">
                        {elders.slice(3).map((elder, i) => (
                            <LeadershipItem key={i} name={elder.name} img={elder.img} index={i + 3} />
                        ))}
                    </div> */}
                    <div className="max-w-[800px] mx-auto flex items-center justify-center flex-wrap gap-5 justify-items-center mb-12">
                        {elders.map((elder, i) => (
                            <LeadershipItem key={i} name={elder.name} img={elder.img} index={i} />
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
                    <div className="max-w-[800px] mx-auto flex items-center justify-center flex-wrap gap-5 justify-items-center mb-12">
                        {deacons.map((deacon, i) => (
                            <LeadershipItem key={i} name={deacon.name} img={deacon.img} index={i} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutLeaders;
