import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../../public/assets/logo3.png";

export default function MobileNav({ toggle }) {
  return (
    <div className="fixed w-screen px-8 pt-6 pb-6 top-0 left-0 bg-white">
      <div className="wrap w-full flex items-center justify-between h-20">
        <div>
          <img src={logo} className="w-12" />
        </div>
        <FontAwesomeIcon
          onClick={toggle}
          icon={faXmark}
          className="text-primary h-5 cursor-pointer"
        />
      </div>
      <div className="wrap flex flex-col pt-8">
        <div className="pb-10">
          <ul className="flex flex-col gap-5 text-primary">
            <li>
              <a href="/">HOME</a>
            </li>
            <li className="relative group">
                          <button className="cursor-pointer">
                            ABOUT
                            <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                          </button>
                          <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg w-60 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-gray-700">
                            <li className="border-b border-gray-200 text-sm">
                              <a
                                href="/history"
                                className="py-4 block px-4 py-2 hover:bg-gray-100"
                              >
                                OUR HISTORY
                              </a>
                            </li>
                            <li className="border-b border-gray-200 text-sm">
                              <a
                                href="/beliefs"
                                className="py-4 block px-4 py-2 hover:bg-gray-100"
                              >
                                WHAT WE BELIEVE
                              </a>
                            </li>
                            <li className="border-b border-gray-200 text-sm">
                              <a
                                href="/leaders"
                                className="py-4 block px-4 py-2 hover:bg-gray-100"
                              >
                                ELDERS & DEACONS
                              </a>
                            </li>
                            <li className="border-b border-gray-200 text-sm">
                              <a
                                href="/ministries"
                                className="py-4 block px-4 py-2 hover:bg-gray-100"
                              >
                                OUR MINISTRIES
                              </a>
                            </li>
                            <li className="border-b border-gray-200 text-sm">
                              <a
                                href="/roasters"
                                className="py-4 block px-4 py-2 hover:bg-gray-100"
                              >
                                ROASTERS
                              </a>
                            </li>
                          </ul>
                        </li>
            <li>
              <a href="/sermons">SERMONS</a>
            </li>
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
    </div>
  );
}