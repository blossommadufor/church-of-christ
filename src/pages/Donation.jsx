import React from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import CTA from "../components/CTA";

const accounts = [
    {
        purpose: "Capital/Projects Account",
        number: "1222803859",
        name: "Church of Christ, Nyanya",
        bank: "Zenith Bank"
    },
    {
        purpose: "TV Evangelism Account",
        number: "2522117111",
        name: "Church of Christ, Nyanya",
        bank: "Ecobank"
    },
    {
        purpose: "General Church Account",
        number: "1234567890",
        name: "Church of Christ, Nyanya",
        bank: "Guaranty Trust Bank (GTB)"
    },
    {
        purpose: "Youth Ministry Account",
        number: "5544332211",
        name: "Church of Christ, Nyanya",
        bank: "Access Bank"
    },
    {
        purpose: "Sisters Ministry Account",
        number: "9988776655",
        name: "Church of Christ, Nyanya",
        bank: "United Bank for Africa (UBA)"
    },
    {
        purpose: "Children Ministry Account",
        number: "2233445566",
        name: "Church of Christ, Nyanya",
        bank: "Fidelity Bank"
    }
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const Donation = () => {
    return (
        <div>
            <Header isFixed />

            <div className="pt-32 pb-20 px-4 min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <motion.h1
                            className="text-primary xl:text-5xl lg:text-4xl md:text-4xl text-3xl font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Support the Work of the Church
                        </motion.h1>
                        <motion.p
                            className="text-gray-600 md:text-lg text-base max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Your generous giving helps us continue our mission of spreading the Gospel, supporting those in need, and expanding our ministries. Thank you for partnering with us in faith.
                        </motion.p>
                    </div>

                    {/* Donation Cards */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {accounts.map((acc, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-light group-hover:h-2 transition-all duration-300"></div>

                                <h3 className="text-primary font-bold text-xl mb-6">{acc.purpose}</h3>

                                <div className="bg-gray-50 w-full py-4 rounded-xl mb-6 border border-gray-100 relative">
                                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Account Number</p>
                                    <p className="text-light text-3xl font-bold tracking-widest">{acc.number}</p>
                                </div>

                                <div className="space-y-2 w-full">
                                    <div className="flex flex-col items-center">
                                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Account Name</p>
                                        <p className="text-gray-800 font-semibold">{acc.name}</p>
                                    </div>
                                    <hr className="border-gray-100 w-1/2 mx-auto my-2" />
                                    <div className="flex flex-col items-center">
                                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Bank Name</p>
                                        <p className="text-gray-800 font-semibold">{acc.bank}</p>
                                    </div>
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

export default Donation;
