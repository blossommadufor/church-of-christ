import React from "react";
import logo from "../../public/assets/logo3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

const AboutContext = () => {
  return (
    <div className="px-8 md:px-10 lg:px-16 py-20 flex flex-col gap-20 md:gap-32">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="md:w-[60%]">
          <h2 className="text-3xl md:text:4xl lg:text-5xl text-primary font-semibold mb-8">
            CHURCH OF CHRIST NYANYA
          </h2>
          <p className=" text-gray-800 pb-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit totam rem
            ape eaque ipsa quae ab illo inven tore Loaper eaque ipsa quae ab
            illo invento eaqu e ipsa quae ab ille a que ipsa quae ab illo
            inventore.
          </p>
          <p className=" text-gray-800 pb-3">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit totam rem
            ape eaque ipsa quae ab illo inven tore Loaper eaque ipsa quae ab
            illo invento eaqu e ipsa quae ab ille a que ipsa quae ab illo
            inventore. inventore.
          </p>
          <p className=" text-gray-800 pb-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit totam rem
            ape eaque ipsa quae ab illo inven tore Loaper eaque ipsa quae ab
            illo invento eaqu e ipsa quae ab ille a que ipsa quae ab illo
            inventore.
          </p>
        </div>
        <div className="w-[40%] flex justify-center">
          <img src={logo} alt="" className="w-96" />
        </div>
      </div>

      <div className="md:bg-[url('/assets/question.jpg')] bg-center bg-cover w-full h-[540px] md:relative">
        <div className="md:absolute inset-0 bg-[rgba(0,0,0,0.6)] md:pr-20 flex justify-end items-center">
          <div className=" bg-gray-50 p-10 lg:w-[50%] md:ml-20 lg:ml-0">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light pb-10">
              WE <span className="text-primary">BELIEVE</span>
            </h3>
            <div>
              <ul className="flex flex-col gap-6 text-gray-600 list-square marker:text-red-500">
                <div className="flex">
                  <FontAwesomeIcon
                    icon={faSquare}
                    className="w-2 pr-5 mt-1 text-primary"
                  />
                  <li>
                    The gifts of the Spirit are at work in the life of the
                    believer, so our services are an experience of the
                    uninhibited flow of the Spirit through prayer, prophecies,
                    and spiritual songs.
                  </li>
                </div>
                <div className="flex">
                  <FontAwesomeIcon
                    icon={faSquare}
                    className="w-2 pr-5 mt-1 text-primary"
                  />
                  <li>
                    That the Word of God is the ultimate standard for doctrine
                  </li>
                </div>
                <div className="flex">
                  <FontAwesomeIcon
                    icon={faSquare}
                    className="w-2 pr-5 mt-1 text-primary"
                  />
                  <li>
                    That the Father's biggest display of affection towards us is
                    in the redemptive work of Christ.
                  </li>
                </div>
                <div className="flex">
                  <FontAwesomeIcon
                    icon={faSquare}
                    className="w-2 pr-5 mt-1 text-primary"
                  />
                  <li>
                    That we are blessed because righteousness is credited to us
                    through the grace of our Lord Jesus Christ.
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContext;
