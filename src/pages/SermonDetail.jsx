import React from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faCalendar, faUser, faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

// Dummy sermon detail — used for all sermon views until Hygraph is connected
const dummy = {
    preacher: "Bro. Hart Emeribe",
    date: "Feb 23, 2025",
    category: "Sunday Sermon",
    topic: "Christian Living",
    scripture: "1 Corinthians 15:1–8",
    img: "/assets/hero.jpg",
    title: "Built on the Word: A Life That Stands",
    body: [
        "The Sermon on the Mount ends with one of the most vivid parables Jesus ever told — two builders, two houses, one storm. The difference was not the storm itself, which was identical for both builders. The difference was the foundation.",
        "Jesus said that whoever hears His words and does them is like the wise man who built his house on the rock. And when the rain descended and the floods came and the winds blew and beat against that house, it stood — because it was founded on the rock.",
        "This is the call of discipleship: not simply to hear the Word, not even simply to admire the Word, but to build our entire lives upon it. Every decision, every relationship, every ambition submitted to the authority of Christ's teaching.",
        "The foolish builder also heard the words. He sat in the same crowd. Perhaps he even nodded along. But when the sermon was over, he went home and built on sand — on comfort, on convenience, on what felt right to him rather than what Christ commanded.",
        "What is the storm that tests our foundation? It may be grief. It may be persecution. It may be the quiet erosion of years of compromise. Whatever form it takes, the storm does not build the house — it only reveals what the house was built on.",
        "Let us be doers of the Word and not hearers only. Let us return to the Bible, not as a devotional decoration, but as the architect's blueprint for our lives. The congregation that is built on the Word is the congregation that will stand.",
    ],
};

const SermonDetail = () => {
    const { id } = useParams();

    return (
        <>
            <Header />

            {/* ── Typographic hero — bg-primary, Oswald heading ── */}
            <div className="bg-primary pt-36 pb-28">
                <div className="wrap">
                    <Link
                        to="/sermons"
                        className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-base font-semibold mb-8 transition"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} /> All Sermons
                    </Link>

                    {/* Category tag */}
                    <p className="uppercase tracking-[0.3em] text-blue-300 text-sm font-semibold mb-4">
                        {dummy.topic} · {dummy.category}
                    </p>

                    {/* Heading — h1 uses Oswald via global CSS */}
                    <h1 className="text-white text-4xl md:text-5xl xl:text-6xl leading-tight max-w-4xl mb-6">
                        {dummy.title}
                    </h1>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-5 text-blue-200 text-base">
                        <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faUser} className="text-blue-400" />
                            {dummy.preacher}
                        </span>
                        <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faCalendar} className="text-blue-400" />
                            {dummy.date}
                        </span>
                        <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faBookOpen} className="text-blue-400" />
                            {dummy.scripture}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Sermon body ── */}
            <div className="bg-gray-50 py-16">
                <div className="wrap">
                    <div className="max-w-3xl">
                        {/* Feature image */}
                        <div className="rounded-2xl overflow-hidden mb-10 shadow-md">
                            <img
                                src={dummy.img}
                                alt={dummy.title}
                                className="w-full h-[340px] object-cover object-top"
                            />
                        </div>

                        {/* Scripture callout */}
                        <blockquote className="border-l-4 border-light pl-6 mb-10 italic text-gray-600 text-lg leading-relaxed">
                            "{dummy.scripture}" — Key Scripture
                        </blockquote>

                        {/* Body paragraphs */}
                        <div className="space-y-6">
                            {dummy.body.map((para, i) => (
                                <p key={i} className="text-gray-700 text-lg leading-relaxed">
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-12" />

                        {/* Back link */}
                        <Link
                            to="/sermons"
                            className="inline-flex items-center gap-2 text-light hover:text-primary font-semibold text-base transition"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} /> Back to all Sermons
                        </Link>
                    </div>
                </div>
            </div>

            <CTA />
            <Footer />
        </>
    );
};

export default SermonDetail;
