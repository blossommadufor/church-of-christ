import { faFacebook, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Contact = () => {
  return (
    <div>
      <div id="contact" className="wrap py-20">
        <h2 className="pb-16 text-primary text-4xl lg:text-5xl font-bold">
          JOIN US IN WORSHIP
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <form className="space-y-5">
            <div>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border border-gray-200 outline-none text-gray-600"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-5 w-full">
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

            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3 px-10 rounded-lg shadow-md hover:border-2 border-light transition duration-300"
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

            <div className="flex items-start gap-8">
              <div className="flex justify-center items-center border-2 border-light rounded-full w-10 h-10 flex-shrink-0">
                <FontAwesomeIcon
                  icon={faShareNodes}
                  className="text-primary text-lg"
                />
              </div>
              <div>
                <h3 className="font-semibold text-2xl pb-2 text-primary">
                  Connect With Us
                </h3>
                <p className="pb-4">Follow our channels for updates</p>
                <div className="flex gap-4">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center border-2 border-light rounded-full w-10 h-10 hover:bg-light hover:text-white transition-all duration-300 group">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-primary text-lg group-hover:text-white transition-colors"
                    />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center border-2 border-light rounded-full w-10 h-10 hover:bg-light hover:text-white transition-all duration-300 group">
                    <FontAwesomeIcon
                      icon={faYoutube}
                      className="text-primary text-lg group-hover:text-white transition-colors"
                    />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center border-2 border-light rounded-full w-10 h-10 hover:bg-light hover:text-white transition-all duration-300 group">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="text-primary text-lg group-hover:text-white transition-colors"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="location" className="w-full h-[600px] pt-20">
        <h2 className="md:pb-16 pb-10 text-primary text-4xl lg:text-5xl font-bold text-center">
          FIND US ON GOOGLE MAPS
        </h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17887.060385719004!2d7.576707408762499!3d9.019851544090487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0f0073933da1%3A0x4940c344fcc7020a!2sChurch%20of%20Christ%20Nyanya!5e0!3m2!1sen!2sng!4v1757654275767!5m2!1sen!2sng"
          width="100%"
          height="100%"
          className="pb-20"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
