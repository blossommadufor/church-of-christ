import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChurch,
  faBookOpen,
  faUsers,
  faMusic,
  faHandsPraying,
  faBullhorn,
  faRadio,
  faTv,
  faCalendarAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const weeklyActivities = [
  {
    icon: faChurch,
    activity: "Sunday Worship",
    description:
      "The Lord's Day assembly where we gather to worship God through singing, praying, the Lord's Supper, giving, and the preaching of His Word.",
    date: "Every Sunday",
    time: "9:00AM – 12:00PM",
    color: "bg-blue-600",
  },
  {
    icon: faUsers,
    activity: "Youth Class",
    description:
      "A dedicated teaching session for the youth of the congregation, guiding the next generation in the Scriptures and Christian living.",
    date: "Every Tuesday",
    time: "6:00PM – 7:00PM",
    color: "bg-violet-600",
  },
  {
    icon: faMusic,
    activity: "Song Practice",
    description:
      "A congregational singing practice session to prepare our hearts and voices for worship. All members are encouraged to attend.",
    date: "Every Tuesday",
    time: "7:00PM – 8:00PM",
    color: "bg-indigo-500",
  },
  {
    icon: faBookOpen,
    activity: "Sisters' Class",
    description:
      "A Bible class specifically for the sisters of the congregation, covering topics relevant to Christian womanhood and family life.",
    date: "Every Thursday",
    time: "5:00PM – 6:00PM",
    color: "bg-pink-600",
  },
  {
    icon: faBookOpen,
    activity: "General Bible Study",
    description:
      "A mid-week study of the Scriptures open to all members and visitors. We dig deeper into God's Word together to strengthen our faith.",
    date: "Every Thursday",
    time: "6:00PM – 7:00PM",
    color: "bg-teal-600",
  },
  {
    icon: faBullhorn,
    activity: "Evangelism Outreach",
    description:
      "We go into the community to share the gospel of Jesus Christ, fulfilling God's Great Commission to preach to every creature.",
    date: "2nd Saturday every month",
    time: "10:00AM – 12:00PM",
    color: "bg-orange-500",
  },
  {
    icon: faHandsPraying,
    activity: "Fasting & Prayers",
    description:
      "A corporate day of fasting and prayer, seeking God's face together for the church, families, and the nation.",
    date: "1st Saturday every month",
    time: "6:00AM – 1:00PM",
    color: "bg-amber-600",
  },
];

const broadcastPrograms = [
  {
    icon: faRadio,
    activity: "RayPower FM 100.5",
    description:
      "Tune in to our weekly radio broadcast on RayPower FM, where the Word of God is proclaimed to the wider Abuja community and beyond.",
    date: "Every Sunday",
    time: "7:00AM – 7:30AM",
    color: "bg-red-600",
  },
  {
    icon: faTv,
    activity: "ITV Channel 130",
    description:
      "Watch our weekly televised program on ITV Channel 130, bringing the gospel into homes across the nation through sound teaching.",
    date: "Every Saturday",
    time: "6:00PM – 6:30PM",
    color: "bg-sky-600",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ActivityCard = ({ icon, activity, description, date, time, color }) => (
  <motion.div
    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    {/* Top accent bar */}
    <div className={`${color} h-2 w-full flex-shrink-0`} />
    <div className="p-6 flex flex-col gap-4 flex-1">
      {/* Icon + Title */}
      <div className="flex items-center gap-4">
        <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
          <FontAwesomeIcon icon={icon} className="text-white text-xl" />
        </div>
        <h3 className="text-primary text-lg font-bold leading-tight">{activity}</h3>
      </div>
      {/* Description */}
      <p className="text-gray-600 text-base leading-relaxed flex-1">{description}</p>
      {/* Date & Time */}
      <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-gray-500 text-base">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-light w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-base">
          <FontAwesomeIcon icon={faClock} className="text-light w-4" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const ActivitiesList = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="wrap">
        {/* Weekly Activities */}
        <div className="mb-20">
          <div className="mb-12">
            <p className="text-light uppercase tracking-widest text-base font-bold mb-2">
              Weekly Schedule
            </p>
            <h2 className="text-primary text-3xl md:text-4xl xl:text-5xl lg:text-4xl font-bold">
              CHURCH ACTIVITIES
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyActivities.map((item, index) => (
              <ActivityCard key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Radio & TV Programs */}
        <div>
          <div className="mb-12">
            <p className="text-light uppercase tracking-widest text-base font-bold mb-2">
              Broadcasting
            </p>
            <h2 className="text-primary text-3xl md:text-4xl xl:text-5xl lg:text-4xl font-bold">
              RADIO & TV PROGRAMS
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {broadcastPrograms.map((item, index) => (
              <ActivityCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesList;
