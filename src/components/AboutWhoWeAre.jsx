import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const AboutWhoWeAre = () => {
    return (
        <div className="bg-white py-20">
            <div className="wrap">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {/* Left: Text */}
                    <motion.div
                        className="md:w-1/2"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-light uppercase tracking-widest text-base font-bold mb-3">
                            Who We Are
                        </p>
                        <h2 className="text-primary text-3xl md:text-4xl xl:text-5xl lg:text-4xl font-semibold leading-[1.3] mb-6">
                            The Church of Christ in Nyanya
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed mb-4">
                            The Church of Christ in Nyanya is a congregation of believers who
                            have been called out of darkness into God's marvellous light. We
                            are committed to being the New Testament church — following the
                            pattern of worship, doctrine, and fellowship established by Christ
                            and His apostles.
                        </p>
                        <p className="text-gray-600 text-base leading-relaxed mb-4">
                            Our congregation actively spreads the gospel of Jesus Christ
                            across Nyanya, Abuja, and beyond. We believe that every soul
                            matters to God, and we are dedicated to reaching the lost, making
                            disciples, and building one another up in the most holy faith.
                        </p>
                        <p className="text-gray-600 text-base leading-relaxed mb-8">
                            Together, we worship, pray, study God's Word, and serve our
                            community — growing in grace and in the knowledge of our Lord and
                            Saviour Jesus Christ.
                        </p>
                        <Link to="/contact">
                            <button className="py-3 px-8 bg-light text-white font-semibold rounded-full hover:bg-primary transition-all duration-300 shadow-md hover:scale-105 text-base">
                                Contact Us
                            </button>
                        </Link>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        className="md:w-1/2 w-full"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="overflow-hidden rounded-2xl shadow-xl">
                            <img
                                src="/assets/hero2.jpeg"
                                alt="Church of Christ Nyanya"
                                className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutWhoWeAre;
