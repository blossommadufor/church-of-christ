import React from "react";
import logo from "../../public/assets/logo3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
     <div className="bg-primary py-16 md:px-20 grid  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-10 md:gap-20 lg:gap-10 justify-center px-8">
      <div className="flex flex-col text-gray-200 items-center col-span-">
        <div>
          <img src={logo} alt="" className="w-20" />
        </div>
        <h2 className="text-2xl text-center pt-4 pb-5">
          Church Of Christ Nyanya
        </h2>
        <p className="text-center">
          Romans 16:16 - "Salute one another with a holy kiss. The churches of
          Christ salute you."
        </p>

        <div className="flex pt-8 gap-5">
          <div className="flex justify-center items-center bg-light rounded-full w-10 h-10 flex-shrink-0">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-gray-200 text-lg"
            />
          </div>
          <div className="flex justify-center items-center bg-light rounded-full w-10 h-10 flex-shrink-0">
            <FontAwesomeIcon
              icon={faYoutube}
              className="text-gray-200 text-lg"
            />
          </div>
        </div>
      </div>

      <div className="text-gray-200">
        <h3 className="pb-5 font-semibold text-lg text-cente">
          CHURCH ACTIVITIES
        </h3>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div>
              <p>
                Sunday Worship <br />
                Time: 9am - 12pm
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              {" "}
              <p>
                Tuesday Youth Class
                <br /> Time: 7 - 7:30am
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              {" "}
              <p>
                Tuesday Song Practice <br /> Time: 7pm - 8pm
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              {" "}
              <p>
                Thursday Sister Class <br /> Time: 5pm - 6pm
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              {" "}
              <p>
                Thursday General Bible Class <br /> Time: 6pm - 7pm
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-gray-200">
        <h3 className="pb-5 font-semibold text-lg text-cente">
          RADIO/TV PROGRAMS
        </h3>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div>
              <p>
                RayPower FM 100.5 - Every Sunday <br /> Time: 7 - 7:30am
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <p>
                ITV Channel 130 - Every Saturday <br /> Time: 6 - 6:30pm
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-5 text-gray-200">
          <h3 className=" font-semibold text-lg text-cente">CONTACT INFO</h3>
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center bg-light rounded-full w-10 h-10">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-gray-200 text-lg"
              />
            </div>
            <div>
              <p>+234-999-888-7777</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center bg-light rounded-full w-10 h-10">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-200 text-lg"
              />
            </div>
            <div>
              <p>
                cocnyanya@gmail.com <br /> P.O Box 3135 Garki Abuja
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center bg-light rounded-full w-10 h-10 flex-shrink-0">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-gray-200 text-lg"
              />
            </div>
            <div>
              <p>Plot R17, Along Nyanya-Karsi Road</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center bg-light rounded-full w-10 h-10">
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-gray-200 text-lg"
              />
            </div>
            <div>
              <p>@Church of christ nyanya </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;