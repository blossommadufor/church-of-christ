import React from "react";

const sermons = [
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    preacher: 'Bro Tom Daniel',
    date:"Nov 21st 2024"
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    preacher: 'Bro Tom Daniel',
    date:"Nov 21st 2024"
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    preacher: 'Bro Tom Daniel',
    date:"Nov 21st 2024"
  },
];

const Sermons = () => {
  return (
    <div id="sermons" className=" py-20 lg:px-16 px-8 md:px-10 bg-white">
      <div className="flex flex-col items-center">
        <h2 className="pb-16 text-secondary text-3xl md:text-4xl lg:text-5xl text-center font-bold">
        OUR RECENT SERMONS
      </h2>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {sermons.map((item, index) => (
          <div key={index} className="shadow-xl rounded-xl">
            <div className="h-[200px]">
              <img src={item.img} alt="" className="h-full w-full object-cover rounded-t-xl"/>
            </div>
            <div className="px-5 py-6 rounded-b-xl bg-white">
              <div className="">
              <p className="text-gray-400 text-xs pb-2">{item.date}</p>
                <h3 className="text-primary text-xl pb-2 font-bold">{item.title}</h3>
                <p className="pb-3 text-gray-600 md:text-lg">{item.preacher}</p>
              </div>
              <div className="border-t-2 pt-4 flex justify-end">
                <button className="py-2 px-4 bg-light text-white hover:bg-primary  font-semibold">Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
        <div className="pt-16 flex justify-center items-center">
            <a href="/sermons"><button className="py-3 px-7 rounded-2xl bg-secondary text-white hover:bg-light hover:text-primary font-semibold text-xl">VIEW ALL</button></a>
        </div>
    </div>
  );
};

export default Sermons;

