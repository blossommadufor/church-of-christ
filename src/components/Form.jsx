import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Form = () => {
  return (
    <div className="py-20 lg:px-16 md:px-10 px-7">
      <div id="contact">
        <h2 className="pb-16 text-primary text-4xl lg:text-5xl font-bold">
          JOIN US IN WORSHIP
        </h2>

        <div className="flex flex-col md:flex-row gap-20">
          <form className="space-y-6 md:w-[60%]">
            <div>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border border-gray-200 outline-none text-gray-600"
              />
            </div>

            <div className="flex gap-5 w-full ">
              <div className="flex-1">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  className=" px-4 py-3 border border-gray-200 outline-none w-full text-gray-600"
                />
              </div>

              <div className="flex-1">
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  required
                  className=" px-4 py-3 border border-gray-200 text-gray-600 w-full"
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                id="name"
                placeholder="Subject"
                required
                className="w-full px-4 py-3 border border-gray-200 outline-none text-gray-600"
              />
            </div>

            <div>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 outline-none text-gray-600"
                placeholder="Have a question or a message?"
                required
                rows={5}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:border-2 border-light transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="flex flex-col gap-8 text-gray-500">
            <div className="flex items-center gap-8">
              <div className="flex justify-center items-center border-2 border-light rounded-full w-10 h-10">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-primary text-lg"
                />
              </div>
              <div>
                <h3 className="font-semibold text-2xl pb-2 text-primary">
                  Phone
                </h3>
                <p>+234-999-888-7777</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex justify-center items-center border-2 border-light rounded-full w-10 h-10">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-primary text-lg"
                />
              </div>
              <div>
                <h3 className="font-semibold text-2xl pb-2 text-primary">
                  Mail
                </h3>
                <p>
                  cocnyanya@gmail.com <br /> P.O Box 3135 Garki Abuja
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 ">
              <div className="flex justify-center items-center border-2 border-light rounded-full w-10 h-10 flex-shrink-0">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-primary text-lg"
                />
              </div>
              <div>
                <h3 className="font-semibold text-2xl pb-2 text-primary">
                  Location
                </h3>
                <p>Plot R17, Along Nyanya-Karsi Road</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex justify-center items-center border-2 border-light rounded-full w-10 h-10">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-primary text-lg"
                />
              </div>
              <div>
                <h3 className="font-semibold text-2xl pb-2 text-primary">
                  Socials
                </h3>
                <p>@Church of christ nyanya </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;