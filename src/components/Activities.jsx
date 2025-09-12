import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const activities = [
  {
    icon: "/assets/wedding.svg",
    activity: "Sunday Worship",
    teacher: "Preachers",
    topic: "God's unfailing love",
    date: "14th September 2025",
    time: "9:00 - 12:00",
  },
  {
    icon: "/assets/wedding.svg",
    activity: "Tuesday Youth Class",
    teacher: "Brother Alex John",
    topic: "Faith that moves mountains",
    date: "18th September 2025",
    time: "6:00 - 7:00",
  },
  {
    icon: "/assets/wedding.svg",
    activity: "Tuesday Song Practice",
    teacher: "Bro Tom Jerry",
    topic: "Living for Christ",
    date: "20th September 2025",
    time: "7:00 - 8:00",
  },
  {
    icon: "/assets/wedding.svg",
    activity: "Thursday Sister Class",
    teacher: "Sis Looney Tunes",
    topic: "Power in Prayer",
    date: "22nd September 2025",
    time: "5:00 - 6:00",
  },
  {
    icon: "/assets/wedding.svg",
    activity: "General Bible Class",
    teacher: "Guest Speaker",
    topic: "Hope in Christ",
    date: "Thursday 25th September 2025",
    time: "6:00 - 7:00",
  },
];

const Activities = () => {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clone slides for looping
  const slides = [...activities, ...activities.slice(0, 2)];

  // Slide width depends on screen
  const slideWidth = isMobile ? 100 : 50;

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [current, isMobile]);

  const nextSlide = () => {
    if (current >= activities.length) return;
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (current === 0) {
      setTransitioning(false);
      setCurrent(activities.length - 1);
      setTimeout(() => setTransitioning(true), 50);
    } else {
      setCurrent((prev) => prev - 1);
    }
  };

  // Reset instantly when reaching cloned slides
  useEffect(() => {
    if (current === activities.length) {
      setTimeout(() => {
        setTransitioning(false);
        setCurrent(0);
        setTimeout(() => setTransitioning(true), 50);
      }, 700);
    }
  }, [current]);

  return (
    <div
      id="activities"
      className="relative bg-light w-full px-12 lg:px-28 mx-auto py-20"
    >
      <h2 className="pb-10 text-white text-3xl md:text-4xl lg:text-5xl text-center font-bold">
        CHURCH ACTIVITIES
      </h2>

      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className={`flex ${
            transitioning ? "transition-transform duration-700 ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${current * slideWidth}%)` }}
        >
          {slides.map((item, index) => (
            <div key={index} className="min-w-[100%] md:min-w-[50%] p-4">
              <div className="bg-gray-100 shadow-lg rounded-2xl px-6 py-10 flex flex-col lg:flex-row gap-5">
                <div className="border-2 w-16 h-16 rounded-full flex items-center justify-center bg-primary flex-shrink-0">
                  <img src={item.icon} className="w-10" />
                </div>
                <div>
                  <h3 className="lg:text-3xl text-xl font-semibold text-primary mb-2">
                    {item.activity}
                  </h3>
                  <p className="text-lg font-semibold text-gray-700">
                    {item.teacher}
                  </p>
                  <p className="text-gray-600 text-xl">{item.topic}</p>
                  <p className="text-sm text-gray-500 mt-2">{item.date}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 lg:left-8 top-1/2 -translate-y-1/2 
                   bg-white shadow-lg p-2 lg:p-4 rounded-full hover:bg-gray-200 text-primary z-20 mt-10"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 lg:right-8 top-1/2 -translate-y-1/2 
                   bg-white shadow-lg p-2 lg:p-4 rounded-full hover:bg-gray-200 z-20 text-primary mt-10"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Activities;

