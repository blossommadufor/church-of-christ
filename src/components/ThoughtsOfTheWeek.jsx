import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const ThoughtsOfTheWeek = () => {
    return (
        <div
            className="relative w-full min-h-[500px] lg:min-h-[600px] bg-cover bg-center bg-no-repeat flex flex-col justify-end"
            style={{ backgroundImage: "url(/assets/hero.jpg)" }}
        >
            {/* Dark overlay with gradient for better readability at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

            {/* Content strictly placed at the bottom-left via flex container padding */}
            <div className="wrap relative z-10 pb-10">
                <div className="md:max-w-3xl">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 drop-shadow-md">
                            Thoughts for the Week
                        </h1>
                        <h2 className="text-white font-serif italic xl:text-2xl lg:text-xl md:text-lg text-base leading-tight mb-6 drop-shadow-lg">
                            "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
                        </h2>
                        <p className="text-gray-300 text-lg font-semibold mb-8">
                            — John 3:16
                        </p>

                        {/* <Link to="/contact">
                            <button className="bg-light text-white py-3 px-8 rounded-full hover:bg-white hover:text-primary transition-all duration-300 font-semibold shadow-md whitespace-nowrap">
                                Worship With Us
                            </button>
                        </Link> */}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ThoughtsOfTheWeek;
