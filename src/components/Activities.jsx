import React from "react";
import activity from '../../public/assets/about2.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      activity: "General Bible Class",
      teacher: "Guest Speaker",
      topic: "Hope in Christ",
      date: "Thursday 25th September 2025",
      time: "6:00 - 7:00",
    },
];

const Activities = () => {
  return (
    <div className="relative bg-secondary lg:px-16 py-20"
    >
      <h2 className="pb-10 text-white text-3xl md:text-4xl lg:text-5xl text-center font-bold">
        CHURCH ACTIVITIES
      </h2>

      <div className="flex flex-col lg:flex-row justify-between gap-10 items-center">
        <div className="lg:w-[50%] grid md:grid-cols-2 lg:grid-cols-1">
          {activities.map((item, index) => (
            <div key={index} className="p-4">
              <div className="bg-gray-100 shadow-lg rounded-2xl px-6 py-10 flex flex-col lg:flex-row gap-5">
                <div className="border-2 w-16 h-16 rounded-full flex items-center justify-center bg-primary flex-shrink-0">
                  <img src={item.icon} className="w-10" />
                </div>
                <div>
                  <h3 className="lg:text-3xl text-xl font-semibold text-primary mb-2">
                    {item.activity}
                  </h3>
                  <p className="text-gray-600 text-xl font-semibold">{item.topic}</p>
                  <p className="font-semibol text-gray-700">
                    {item.teacher}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{item.date}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:w-[50%] px-8">
          <img src={activity} className="rounded-2xl"/>
        </div>
      </div>

      <div className="pt-16 flex justify-center items-center">
            <a href="/activities"><button className="py-3 px-7 rounded-2xl bg-primary text-white hover:bg-white hover:text-primary font-semibold text-xl">MORE ACTIVITIES </button></a>
        </div>
    </div>
  );
};

export default Activities;
