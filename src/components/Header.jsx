import { useEffect, useState } from "react";
import logo from "../../public/assets/logo3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MobileNav from "./MobileNav";

const Header = ({ isFixed = false }) => {
  const [showNav, setShowNav] = useState(false);
  const [sticky, setSticky] = useState(isFixed);

  useEffect(() => {
    const handleScroll = () => {
      if (!isFixed) {
        setSticky(window.scrollY > 0); // becomes sticky after scrolling down
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-screen z-50 ${sticky
        ? "bg-white shadow-md text-primary"
        : "bg-transparent text-gray-200 pt-6 xl:pt-12"
        } px-8`}
    >
      <div className="wrap flex justify-between items-center md:px-0">
        {/* Left nav */}
        <div className="lg:block hidden">
          <ul
            className={`flex gap-5 xl:gap-16 font-semibold py-3 ${sticky ? "" : "border-t-2 border-b-2 border-white"
              }`}
          >
            <li>
              <a href="/">HOME</a>
            </li>

            <li>
              <a href="/about">ABOUT</a>
            </li>

            <li>
              <a href="/sermons">SERMONS</a>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="py-2 flex items-center gap-3 ">
          <img
            src={logo}
            alt="Logo"
            className={`${sticky ? "w-16" : "xl:w-24 w-16"}`}
          />
        </div>

        {/* Right nav */}
        <div className="lg:block hidden">
          <ul
            className={`flex gap-5 xl:gap-16 font-semibold py-3 ${sticky ? "" : "border-t-2 border-b-2 border-white"
              }`}
          >
            <li>
              <a href="/activities">ACTIVITIES</a>
            </li>
            <li>
              <a href="/contact">CONTACT</a>
            </li>
            <li>
              <a href="/members">MEMBERS</a>
            </li>
          </ul>
        </div>
        <div className=" lg:hidden cursor-pointer">
          <FontAwesomeIcon
            onClick={() => setShowNav(true)}
            icon={faBars}
            className="h-8"
          />
        </div>
        {showNav && <MobileNav toggle={() => setShowNav(false)} />}
      </div>
    </div>
  );
};

export default Header;
