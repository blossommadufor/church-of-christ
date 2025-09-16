import { useEffect, useState } from "react";
import logo from "../../public/assets/logo3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0); // becomes sticky after scrolling down
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-screen z-50 ${
        sticky
          ? "bg-white shadow-md text-primary"
          : "bg-transparent text-gray-200 pt-12"
      } py-2 px-8`}
    >
      <div className="container mx-auto flex justify-between items-center md:px-6">
        {/* Left nav */}
        <ul
          className={`flex gap-5 xl:gap-16 font-semibold py-3 px-10 ${
            sticky ? "" : "border-t-2 border-b-2 border-white"
          }`}
        >
          <li>
            <a href="/">HOME</a>
          </li>

          {/* Dropdown (group-hover) */}
          <li className="relative group">
            <button className="cursor-pointer">ABOUT<FontAwesomeIcon icon={faChevronDown} className="ml-1"/></button>
            <ul
              className='absolute top-full left-0 mt-2 bg-white shadow-lg w-60 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-gray-700'
            >
              <li className="border-b border-gray-200 text-sm">
                <a
                  href="/sermons/recent"
                  className="py-4 block px-4 py-2 hover:bg-gray-100"
                >
                  OUR HISTORY
                </a>
              </li>
              <li className="border-b border-gray-200 text-sm">
                <a
                  href="/sermons/all"
                  className="py-4 block px-4 py-2 hover:bg-gray-100"
                >
                  WHAT WE BELIEVE
                </a>
              </li>
              <li className="border-b border-gray-200 text-sm">
                <a
                  href="/sermons/popular"
                  className="py-4 block px-4 py-2 hover:bg-gray-100"
                >
                  ELDERS & DEACONS
                </a>
              </li>
              <li className="border-b border-gray-200 text-sm">
                <a
                  href="/sermons/all"
                  className="py-4 block px-4 py-2 hover:bg-gray-100"
                >
                  OUR MINISTRIES
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a href="/sermons">SERMONS</a>
          </li>
        </ul>

        {/* Logo */}
        <div className="py-2 flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className={`${sticky ? "w-16" : "w-28"}`}
          />
        </div>

        {/* Right nav */}
        <ul
          className={`flex gap-5 xl:gap-16 font-semibold py-3 px-10 ${
            sticky ? "" : "border-t-2 border-b-2 border-white"
          }`}
        >
          <li>
            <a href="/activities">ACTIVITIES</a>
          </li>
          <li>
            <a href="/contact">CONTACT</a>
          </li>
          <li>
            <a href="/location">LOCATION</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;


