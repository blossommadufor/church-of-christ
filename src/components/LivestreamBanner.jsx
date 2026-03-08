import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const LivestreamBanner = () => {
    return (
        <div className="bg-primary py-12 md:py-16">
            <div className="wrap flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Left Side: Text */}
                <div className="text-center md:text-left text-white max-w-2xl">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                        Worship With Us Online
                    </h2>
                    <p className="text-gray-300 text-base md:text-lg">
                        Join our Sunday services live from anywhere in the world and be a part of our digital congregation.
                    </p>
                </div>

                {/* Right Side: CTA Button */}
                <div className="flex-shrink-0 mt-4 md:mt-0">
                    <Link to="#">
                        <button className="flex items-center gap-2 bg-light text-white py-4 px-8 rounded-full hover:bg-white hover:text-primary transition-all duration-300 font-semibold shadow-md text-lg">
                            <FontAwesomeIcon icon={faPlayCircle} className="text-xl" />
                            Join the Livestream
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LivestreamBanner;
