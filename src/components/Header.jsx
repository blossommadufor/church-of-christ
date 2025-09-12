import { useEffect, useState } from "react";
import logo from "../../public/assets/logo3.png";
import MobileNav from "./MobileNav";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 👇 split into left and right
const leftSections = ["home", "about", "sermons", "activities"];
const rightSections = ["question", "contact", "location", "socials"];

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showNav, setShowNav] = useState(false);

  // Sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "home") {
              setActiveSection(""); // Clear highlight in hero
            } else {
              setActiveSection(entry.target.id); // Highlight section
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    );

    // ✅ Observe all sections except "home"
    [...leftSections, ...rightSections].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // ✅ Observe home separately
    const homeEl = document.getElementById("home");
    if (homeEl) observer.observe(homeEl);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-screen z-50 transition-all duration-300 flex items-center 
        ${
          sticky
            ? "bg-white shadow-md text-primary py-2 px-8"
            : "bg-transparent lg:pt-12 pt-6 text-gray-200 px-8"
        }
      `}
    >
      <div className="container mx-auto flex justify-between items-center md:px-6">
        {/* Left nav */}
        <div
          className={`${
            sticky ? "" : "border-t border-b border-white xl:ml-10 "
          } hidden lg:block`}
        >
          <ul className="flex gap-5 xl:gap-10 font-semibold py-3 px-10">
            {leftSections.map((sec) => (
              <a key={sec} href={`#${sec}`}>
                <li
                  className={`cursor-pointer transition ${
                    activeSection === sec
                      ? "text-primary font-bold border-b-2 border-primary"
                      : ""
                  }`}
                >
                  {sec.toUpperCase()}
                </li>
              </a>
            ))}
          </ul>
        </div>

        {/* Logo in middle */}
        <div className="py-2 flex items-center gap-3 ">
          <img
            src={logo}
            alt="Logo"
            className={`${sticky ? "md:w-16 w-12" : "w-16"}`}
          />
        </div>

        {/* Right nav */}
        <div
          className={`${
            sticky ? "" : "border-t border-b border-white xl:mr-10 "
          } hidden lg:block`}
        >
          <ul className="flex gap-5 xl:gap-10 py-3 px-10 font-semibold">
            {rightSections.map((sec) => (
              <a key={sec} href={`#${sec}`}>
                <li
                  className={`cursor-pointer transition ${
                    activeSection === sec
                      ? "text-primary font-bold border-b-2 border-primary"
                      : ""
                  }`}
                >
                  {sec.toUpperCase()}
                </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
      <div className="lg:hidden cursor-pointer">
          <FontAwesomeIcon
            onClick={() => setShowNav(true)}
            icon={faBars}
            className={`${sticky ? "text-primary" : "text-white"} h-5`}
          />
        </div>
      {showNav && <MobileNav toggle={() => setShowNav(false)} />}
    </div>
  );
};

export default Header;
