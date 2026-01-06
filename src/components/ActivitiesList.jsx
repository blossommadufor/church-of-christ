import React from "react";

const ActivitiesList = () => {
  const activitiesItem = [
    {
      icon: "/assets/wedding.svg",
      activity: "Sunday Worship",
      teacher: "Preachers",
      topic: "God's unfailing love",
      date: "every Sunday",
      time: "9:00AM - 12:00PM",
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
    {
      icon: "/assets/wedding.svg",
      activity: "General Bible Class",
      teacher: "Guest Speaker",
      topic: "Hope in Christ",
      date: "Every Thursday",
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
  ];

  return (
    <div className="px-4 md:px-10 lg:px-16 py-20">
      <div className="pb-16 text-center">
        <h2 className=" text-primary text-3xl md:text-4xl lg:text-5xl text-center font-bold pb-2">
          CHURCH ACTIVITIES
        </h2>
        <p className="text-light mt-2">
          Here are all the weekly activities of the church
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {activitiesItem.map((item, index) => (
          <div key={index} className="p-4">
            <div className="bg-gray-50 shadow-lg rounded-2xl px-6 py-10 flex flex-col lg:flex-row gap-5">
              <div className="border-2 w-16 h-16 rounded-full flex items-center justify-center bg-primary flex-shrink-0">
                <img src={item.icon} className="w-10" />
              </div>
              <div>
                <h3 className="lg:text-3xl text-xl font-semibold text-primary mb-2">
                  {item.activity}
                </h3>
                <p className="text-lg text-gray-500 mt-2">{item.date}</p>
                <p className="text-sm text-gray-500 mt-2">{item.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesList;
