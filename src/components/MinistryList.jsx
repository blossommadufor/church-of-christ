import React from "react";

const MinistyList = () => {
  const men = [
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
  ];
  const women = [
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
  ];

  const envangelism = [
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bischop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bischop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bischop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bischop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bischop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bischop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bischop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
    {
      img: "/assets/placeholder.jpg",
      name: "Bishop Austin Ohaju",
    },
  ];

  return (
    <div className="lg:px-16 md:px-10 px-7 py-20">
      <div className="pb-32">
        <h2 className=" text-primary text-3xl md:text-4xl lg:text-5xl font-bold pb-2">
          EVANGELISM MINISTRY
        </h2>
        <p className="mt-3 pb-16 text-light text-lg">
          These are the members of our evangelism ministry
        </p>

        <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10">
          {envangelism.map((item, index) => (
            <div key={index} className="bg-blue-100 shadow-xl">
              <div className="">
                <img src={item.img} className="" />
              </div>
              <div className='py-4 px-2'>
                <h3 className="text-lg text-center">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-32">
        <h2 className=" text-primary text-3xl md:text-4xl lg:text-5xl font-bold pb-2">
          MEN MINISTRY
        </h2>
        <p className="mt-3 pb-16 text-light text-lg">
          These are the members of our Men ministry
        </p>

        <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10">
          {men.map((item, index) => (
            <div key={index} className="bg-blue-100 shadow-xl">
              <div className="">
                <img src={item.img} className="" />
              </div>
              <div className='py-4 px-2'>
                <h3 className="text-lg text-center">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className=" text-primary text-3xl md:text-4xl lg:text-5xl font-bold pb-2">
          WOMEN MINISTRY
        </h2>
        <p className="mt-3 pb-16 text-light text-lg">
          These are the members of our Women ministry
        </p>

        <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10">
          {women.map((item, index) => (
            <div key={index} className="bg-blue-100 shadow-xl">
              <div className="">
                <img src={item.img} className="" />
              </div>
              <div className='py-4 px-2'>
                <h3 className="text-lg text-center">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinistyList;
