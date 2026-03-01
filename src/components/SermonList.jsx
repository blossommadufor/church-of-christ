import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
  faFilter,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import SermonCard from "./SermonCard";

// ── Dummy sermon data (replace with Hygraph queries later) ──────────────────
const sermons = [
  {
    id: 1,
    img: "/assets/hero.jpg",
    title: "The Power of the Resurrection",
    preacher: "Bro. Hart Emeribe",
    date: "Feb 23, 2025",
    category: "Sunday Sermon",
    topic: "Salvation",
  },
  {
    id: 2,
    img: "/assets/hero2.jpeg",
    title: "Walking in the Spirit: A Call to Holy Living",
    preacher: "Bro. Jacob Achobe",
    date: "Feb 16, 2025",
    category: "Bible Class",
    topic: "Christian Living",
  },
  {
    id: 3,
    img: "/assets/hero.jpg",
    title: "What Must I Do to Be Saved?",
    preacher: "Bro. Augustine Ohaju",
    date: "Feb 9, 2025",
    category: "Sunday Sermon",
    topic: "Salvation",
  },
  {
    id: 4,
    img: "/assets/hero2.jpeg",
    title: "The Lord's Supper: Our Weekly Memorial",
    preacher: "Bro. Ntewo Bassey",
    date: "Feb 2, 2025",
    category: "Evangelism",
    topic: "Worship",
  },
  {
    id: 5,
    img: "/assets/hero.jpg",
    title: "Baptism: Buried and Raised With Christ",
    preacher: "Bro. Udoma Inyang",
    date: "Jan 26, 2025",
    category: "Sunday Sermon",
    topic: "Salvation",
  },
  {
    id: 6,
    img: "/assets/hero2.jpeg",
    title: "Singing Psalms, Hymns and Spiritual Songs",
    preacher: "Bro. Hart Emeribe",
    date: "Jan 19, 2025",
    category: "Bible Class",
    topic: "Worship",
  },
];

const categories = ["All", "Sunday Sermon", "Bible Class", "Evangelism"];
const topics = ["All Topics", "Salvation", "Worship", "Christian Living"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const SermonList = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTopic, setActiveTopic] = useState("All Topics");

  const filtered = useMemo(() => {
    return sermons.filter((s) => {
      const matchSearch =
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.preacher.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        activeCategory === "All" || s.category === activeCategory;
      const matchTopic =
        activeTopic === "All Topics" || s.topic === activeTopic;
      return matchSearch && matchCat && matchTopic;
    });
  }, [search, activeCategory, activeTopic]);

  const hasFilters =
    search || activeCategory !== "All" || activeTopic !== "All Topics";

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setActiveTopic("All Topics");
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="wrap">
        {/* ── Section header ── */}
        <div className="mb-10">
          <p className="text-light uppercase tracking-widest text-base font-bold mb-2">
            Sermon Library
          </p>
          <h2 className="text-primary text-3xl md:text-4xl xl:text-5xl lg:text-4xl font-semibold">
            All Sermons
          </h2>
        </div>

        {/* ── Search + Filters bar ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-12 flex flex-col gap-5">
          {/* Search input */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by sermon title or preacher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition text-base"
            />
          </div>

          {/* Filter row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-500 text-sm font-semibold self-center flex items-center gap-1 mr-1">
                <FontAwesomeIcon icon={faFilter} className="text-light" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-base font-semibold border transition-all duration-200 ${activeCategory === cat
                    ? "bg-light text-white border-light"
                    : "bg-white text-gray-600 border-gray-200 hover:border-light hover:text-light"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Topic dropdown */}
            <div className="relative">
              <select
                value={activeTopic}
                onChange={(e) => setActiveTopic(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-xl border border-gray-200 text-gray-600 text-base font-semibold outline-none focus:border-light cursor-pointer bg-white transition"
              >
                {topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm"
              />
            </div>
          </div>

          {/* Active filter summary + clear */}
          {hasFilters && (
            <div className="flex items-center gap-3 pt-1 border-t border-gray-100 text-sm text-gray-500">
              <span>
                Showing <span className="font-bold text-primary">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
              </span>
              <button
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1 text-red-400 hover:text-red-600 font-semibold transition"
              >
                <FontAwesomeIcon icon={faXmark} /> Clear filters
              </button>
            </div>
          )}
        </div>

        {/* ── Sermon grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((sermon, index) => (
              <motion.div
                key={sermon.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.45, delay: index * 0.07 }}
                viewport={{ once: true }}
              >
                <SermonCard
                  img={sermon.img}
                  title={sermon.title}
                  preacher={sermon.preacher}
                  date={sermon.date}
                  id={sermon.id}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-400 text-xl font-semibold mb-2">No sermons found</p>
            <p className="text-gray-400 text-base">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SermonList;
