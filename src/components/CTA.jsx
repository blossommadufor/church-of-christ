import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faComments,
} from "@fortawesome/free-solid-svg-icons";
import AskQuestionModal from "./AskQuestionModal";

const CTA = () => {
    const [showQuestionModal, setShowQuestionModal] = useState(false);

    return (
        <div
            className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-28 lg:py-36"
            style={{ backgroundImage: "url(/assets/church1.png)" }}
        >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/75" />

            {/* Decorative blobs */}
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-light/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-light/10 blur-3xl" />

            <div className="wrap relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Tag */}
                    <motion.p
                        className="text-blue-300 uppercase tracking-widest text-base font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        You Are Welcome Here
                    </motion.p>

                    {/* Heading */}
                    <motion.h2
                        className="text-white xl:text-5xl lg:text-4xl md:text-4xl text-3xl font-semibold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Ready to give your life to{" "}
                        <span className="text-blue-300">Christ?</span>
                    </motion.h2>

                    {/* Sub text */}
                    <motion.p
                        className="text-gray-300 md:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        We'd love to meet you. Come worship with us on Sunday, explore the
                        Scriptures with our community, or simply reach out — our doors and
                        hearts are always open.
                    </motion.p>

                    {/* CTA Buttons — 2 buttons, icons only */}
                    <motion.div
                        className="flex flex-row gap-3 sm:gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex-1 sm:flex-none">
                            <button
                                onClick={() => setShowQuestionModal(true)}
                                className="w-full flex justify-center items-center gap-2 sm:gap-3 py-3 px-2 sm:py-4 sm:px-8 bg-light border-2 border-light text-white text-xs sm:text-base font-semibold rounded-full hover:bg-blue-400 hover:border-blue-400 transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap"
                            >
                                <FontAwesomeIcon icon={faComments} />
                                Ask a Question
                            </button>
                        </div>
                        <Link to="/location" className="flex-1 sm:flex-none">
                            <button className="w-full flex justify-center items-center gap-2 sm:gap-3 py-3 px-2 sm:py-4 sm:px-8 bg-white/10 border-2 border-white/60 text-white text-xs sm:text-base font-semibold rounded-full hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm hover:scale-105 whitespace-nowrap">
                                <FontAwesomeIcon icon={faLocationDot} />
                                Visit Us
                            </button>
                        </Link>
                    </motion.div>

                    {/* Scripture tag */}
                    {/* <motion.p
                        className="mt-14 text-gray-400 italic text-base"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        "Come to me, all you who are weary and burdened, and I will give you
                        rest." — Matthew 11:28
                    </motion.p> */}
                </div>
            </div>

            <AskQuestionModal
                isOpen={showQuestionModal}
                onClose={() => setShowQuestionModal(false)}
            />
        </div>
    );
};

export default CTA;
