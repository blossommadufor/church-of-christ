import { React, useState } from "react";

const data = [
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love1",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "sermon",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love2",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "sermon",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love3",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "sermon",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love4",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "sermon",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love5",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "sermon",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love6",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "sermon",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love1",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "teaching",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love2",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "teaching",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love3",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "teaching",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love4",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "teaching",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love5",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "teaching",
  },
  {
    img: "/assets/sermons.jpg",
    title: "All that you need to know about God's love6",
    teacher: "Bro Jackson Micheal",
    date: "Nov 21st 2024",
    type: "teaching",
  },
];

const SermonList = () => {
  const [category, setCategory] = useState("all"); // "all", "sermon", "teaching"
  const [search, setSearch] = useState("");

  // Filter logic
  const filtered = data.filter((item) => {
    const matchesCategory = category === "all" ? true : item.type === category;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="md:px-10 px-8 lg:px-10 xl:px-16 py-10 lg:py-20">
      <div className="p-6 flex flex-col md:flex-row md:gap-10">
        {/* Filter Buttons */}
        <div className="">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setCategory("all")}
              className={`px-4 py-2 rounded ${
                category === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setCategory("sermon")}
              className={`px-4 py-2 rounded ${
                category === "sermon" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Sermons
            </button>
            <button
              onClick={() => setCategory("teaching")}
              className={`px-4 py-2 rounded ${
                category === "teaching"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Teachings
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-6 outline-0"
          />
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white shadow-xl"
            >
              <div className="md:w-[40%] lg:w-[50%]">
                <img alt="" src={item.img} className="h-full object-cover" />
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
          ))
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SermonList;
