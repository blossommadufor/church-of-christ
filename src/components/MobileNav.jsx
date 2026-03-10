import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
            <li>
              <a href="/about">ABOUT</a>
            </li>
            <li>
              <a href="/teachings">TEACHINGS</a>
            </li>
            <li>
              <a href="/ministries">MINISTRIES</a>
            </li>
            <li>
              <a href="/activities">ACTIVITIES</a>
            </li>
            <li>
              <a href="/contact">CONTACT</a>
            </li>
            <li>
              <a href="/donation">DONATE</a>
            </li>
            <li>
              <a href="/members">MEMBERS</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}