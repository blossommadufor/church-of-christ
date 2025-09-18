import React from 'react'

const teachings = [
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    teacher: 'Bro Jackson Micheal',
    date: "Nov 21st 2024",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    teacher: 'Bro Jackson Micheal',
    date: "Nov 21st 2024",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    teacher: 'Bro Jackson Micheal',
    date: "Nov 21st 2024",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    teacher: 'Bro Jackson Micheal',
    date: "Nov 21st 2024",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    teacher: 'Bro Jackson Micheal',
    date: "Nov 21st 2024",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love",
    teacher: 'Bro Jackson Micheal',
    date: "Nov 21st 2024",
  },
];

const Teachings = () => {
  return (
    <div className="bg-gray-100 xl:px-16 lg:px-12 px-10 py-20">
      <div className="pb-16 text-center">
        <h2 className=" text-primary text-3xl md:text-4xl lg:text-5xl text-center font-bold pb-2">
        SUNDAY SCHOOL TEACHINGS
      </h2>
      <p className="text-light mt-2">Check out some of our Teachings as well.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        {teachings.map((item, index) => (
          <div key={index} className="flex bg-white shadow-xl">
            <div className="lg:w-[50%] md:w-[40%]">
              <img alt="" src={item.img}  className="h-full object-cover"/>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-xl text-primary">{item.title}</h3>
              <p className="mt-2 text-lg text-gray-700 ">{item.teacher}</p>
              <p className="mt-2 text-gray-700 text-sm">{item.date}</p>
              <div className="justify-end flex mt-4">
                <button className="py-2 px-4 bg-light text-white hover:bg-primary  font-semibold">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Teachings
