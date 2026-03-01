import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faCross,
    faChurch,
    faDroplet,
    faPrayingHands,
    faHandshake,
    faBreadSlice,
    faLeaf,
} from "@fortawesome/free-solid-svg-icons";

const beliefs = [
    {
        icon: faBookOpen,
        title: "The Authority of Scripture",
        text: "We believe the Bible is the inspired, infallible Word of God — our only rule of faith and practice (2 Timothy 3:16–17).",
    },
    {
        icon: faCross,
        title: "Salvation Through Christ",
        text: "Jesus Christ is the only way to salvation. Through His death, burial, and resurrection, God offers forgiveness to all who obey the gospel (John 14:6; Romans 1:16).",
    },
    {
        icon: faChurch,
        title: "The New Testament Church",
        text: "We seek to be the church described in the New Testament — bound by no creed but Christ and no book but the Bible (Acts 2:47; Ephesians 1:22–23).",
    },
    {
        icon: faDroplet,
        title: "Baptism for Remission of Sins",
        text: "We believe baptism (immersion in water) is essential to salvation — for the remission of sins and the gift of the Holy Spirit (Acts 2:38; Mark 16:16).",
    },
    {
        icon: faPrayingHands,
        title: "Worship in Spirit and Truth",
        text: "We worship God as He has prescribed: through singing, praying, the Lord's Supper, giving, and preaching (John 4:24; Colossians 3:16).",
    },
    {
        icon: faHandshake,
        title: "The Unity of Believers",
        text: "We pray for the unity of all Christians as Jesus prayed — based on the Word of God alone, not human traditions (John 17:20–21; Ephesians 4:3).",
    },
    {
        icon: faBreadSlice,
        title: "The Lord's Supper",
        text: "We observe the Lord's Supper every first day of the week, remembering Christ's sacrifice until He comes again (Acts 20:7; 1 Corinthians 11:26).",
    },
    {
        icon: faLeaf,
        title: "Christian Living & Holiness",
        text: "We are called to live holy lives, walking worthy of our calling and shining as lights in the world (1 Peter 1:15–16; Philippians 2:15).",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const AboutBeliefs = () => {
    return (
        <div className="bg-gray-50 py-20">
            <div className="wrap">
                {/* Header */}
                <div className="mb-14 text-center">
                    <p className="text-light uppercase tracking-widest text-base font-bold mb-3">
                        Our Doctrine
                    </p>
                    <h2 className="text-primary text-3xl md:text-4xl xl:text-5xl lg:text-4xl font-semibold mb-4">
                        What We Believe
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
                        Our faith is anchored in the New Testament. We speak where the
                        Bible speaks, and remain silent where the Bible is silent — holding
                        firmly to the faith once for all delivered to the saints (Jude 1:3).
                    </p>
                </div>

                {/* Belief grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {beliefs.map((belief, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col gap-4"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <FontAwesomeIcon icon={belief.icon} className="text-primary text-xl" />
                            </div>
                            <h3 className="text-primary text-lg font-bold leading-snug">
                                {belief.title}
                            </h3>
                            <p className="text-gray-600 text-base leading-relaxed">{belief.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutBeliefs;
