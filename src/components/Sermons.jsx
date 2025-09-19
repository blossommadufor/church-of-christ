import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from '../../public/assets/heading-img.webp'
import React from "react";

const sermons = [
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    text: "eawrsdtfgyuhio jkpl[koij huygtfrcvhbyukohuygtf rdfgy",
    date:"Nov 21st 2024"
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    text: "eawrsdtfgyuhiojkpl[koijh uygtfrcvhbyukohuygtf rdfgy",
    date:"Nov 21st 2024"
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    text: "eawrsdtfgyuhiojkpl[koijhu ygtfrcvhbyukohuygtf rdfgy",
    date:"Nov 21st 2024"
  },
];

const Sermons = () => {
  return (
    <div id="sermons" className=" py-20 lg:px-16 px-8 md:px-10 bg-gray-300">
      <div className="flex flex-col items-center">
        <h2 className="pb-16 text-secondary text-3xl md:text-4xl lg:text-5xl text-center font-bold">
        OUR RECENT SERMONS
      </h2>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {sermons.map((item, index) => (
          <div key={index} className="shadow-xl">
            <div className="h-[200px]">
              <img src={item.img} alt="" className="h-full w-full object-cover"/>
            </div>
            <div className="px-5 py-6 h-[] bg-white">
              <div className="">
              <p className="text-gray-400 text-xs pb-2">{item.date}</p>
                <h3 className="text-primary text-xl pb-2 font-bold">{item.title}</h3>
                <p className="pb-3 text-gray-600 ">{item.text}</p>
              </div>
              <div className="border-t-2 pt-4 flex justify-end">
                <button className="py-2 px-4 bg-light text-white hover:bg-primary  font-semibold">Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
        <div className="pt-16 flex justify-center items-center">
            <a href="/sermons"><button className="py-3 px-7 rounded-2xl bg-primary text-white hover:bg-light hover:text-primary font-semibold text-xl">LOAD MORE</button></a>
        </div>
    </div>
  );
};

export default Sermons;

