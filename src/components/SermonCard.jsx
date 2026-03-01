import React from "react";
import { Link } from "react-router-dom";

const SermonCard = ({ id, img, title, preacher, date }) => {
    return (
        <div className="shadow-xl rounded-xl overflow-hidden group flex flex-col">
            {/* Image */}
            <div className="h-[200px] overflow-hidden flex-shrink-0">
                <img
                    src={img}
                    alt={title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content — flex column so button always sits at the bottom */}
            <div className="px-5 py-6 bg-white flex flex-col flex-1">
                <p className="text-gray-400 text-sm pb-1">{date}</p>
                {/* Clamp title to 2 lines for uniform card height */}
                <h3 className="text-primary text-lg font-bold leading-snug line-clamp-2 min-h-[3.5rem]">
                    {title}
                </h3>
                <p className="pt-2 pb-4 text-gray-600">{preacher}</p>

                {/* Button pinned to the bottom */}
                <div className="border-t-2 pt-4 flex justify-end mt-auto">
                    <Link to={`/sermons/${id}`}>
                        <button className="py-2 px-5 bg-light text-white hover:bg-primary font-semibold rounded transition-colors duration-200">
                            View
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SermonCard;
