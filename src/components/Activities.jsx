import React from "react";
// import activity from '../../public/assets/about2.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const activities = [
  {
    icon: "/assets/wedding.svg",
    activity: "Sunday Worship",
    date: "Every Sunday",
    time: "9:00AM - 12:00PM",
  },
  {
      icon: "/assets/wedding.svg",
      activity: "General Bible Class",
      date: " Every Thursday",
      time: "6:00PM - 7:00PM",
    },
    {
      icon: "/assets/wedding.svg",
      activity: "Evangelism",
      teacher: "Guest Speaker",
      topic: "Hope in Christ",
      date: "Every 2nd Saturday",
      time: "10:00AM - 12:00PM",
    },
    {
      icon: "/assets/wedding.svg",
      activity: "Fasting & Prayers",
      teacher: "Guest Speaker",
      topic: "Hope in Christ",
      date: "Every 1st Saturday",
      time: "6:00AM - 1:00PM",
    },
    {
      icon: "/assets/wedding.svg",
      activity: "Tuesday Youth Class",
      teacher: "Brother Alex John",
      topic: "Faith that moves mountains",
      date: "Every Tuesday",
      time: "6:00PM - 7:00PM",
    },
    {
      icon: "/assets/wedding.svg",
      activity: "Tuesday Song Practice",
      teacher: "Bro Tom Jerry",
      topic: "Living for Christ",
      date: "Every Tuesday",
      time: "7:00PM - 8:00PM",
    },
    {
      icon: "/assets/wedding.svg",
      activity: "Thursday Sister Class",
      teacher: "Sis Looney Tunes",
      topic: "Power in Prayer",
      date: "Every Thursday",
      time: "5:00PM - 6:00PM",
    },
];

const Activities = () => {
  return (
    <div className="relative bg-secondary md:px-5git push lg:px-16 py-20"
    >
      <h2 className="pb-10 text-white text-3xl md:text-4xl lg:text-5xl text-center font-bold">
        CHURCH ACTIVITIES
      </h2>

      {/* <div className="flex flex-col lg:flex-row justify-between gap-10 items-center"> */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {activities.map((item, index) => (
            <div key={index} className="p-4">
              <div className="bg-gray-50 shadow-lg rounded-2xl px-6 py-10 flex flex-col gap-4">
                <div className="border-2 w-16 h-16 rounded-full flex items-center justify-center bg-primary flex-shrink-0">
                  <img src={item.icon} className="w-10" />
                </div>
                <div>
                  <h3 className="lg:text-2xl text-xl font-semibold text-primary mb-2">
                    {item.activity}
                  </h3>
                  <p className="text-lg text-gray-500 mt-2">{item.date}</p>
                  <p className="text-sm text-gray-500 mt-2">{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="lg:w-[50%] px-8">
          <img src={activity} className="rounded-2xl"/>
        </div> */}
      {/* </div> */}

      <div className="pt-16 flex justify-center items-center">
            <a href="/activities"><button className="py-3 px-7 rounded-2xl bg-primary text-white hover:bg-white hover:text-primary font-semibold text-xl">MORE ACTIVITIES </button></a>
        </div>
    </div>
  );
};

export default Activities;
