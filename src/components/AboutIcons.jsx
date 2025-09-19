import { faBookBible, faHandsPraying, faMuseum, faPray, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AboutIcons = () => {
  return (
    <div className="relative bg-[url('/assets/hero2.jpeg')] bg-top bg-cover bg-no-repeat flex items-center justify-center h-screen lg:max-h-[600px] md:max-h-[530px] max-h-[760px]">
      <div className="absolute inset-0 bg-[rgba(38,41,77,0.9)] flex flex-col md:flex-row justify-between items-center px-8 md:px-10 lg:px-16">
        <div className="md:w-[50%] lg:w-[5
        
        0%]">
          <h2 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl mt-12 md:mt-0 lg:mt-12 text-gray-200 font-semibold uppercase">JOIN US FOR A FULL EXPERIENCE OF GOD'S PRESENCE AND POWER</h2>
          <p className="font-semibold lg:text-lg mt-6 lg:mt-10 text-gray-200">
            We believe in the power of worship to lift burdens, the Word of God to renew minds, and prayer to bring healing and breakthrough. We believe in fellowship that strenghtens hearts and in the Holy Spirit's presence that changes everything
          </p>
          <div className="mt-6 lg:mt-10">
            <a href="/beliefs">
              <button className="bg-light text-white  py-2 px-6 rounded-3xl">
                More about us
              </button>
            </a>
          </div>
        </div>
        <div className="md:w-[40%] w-[52%] grid grid-cols-2 mt-16 md:mt-10 gap-y-0 gap-x-36 md:gap-10 lg:gap-20 h-[80%] ">
           <div className="flex flex-col items-center">
             <div className=" border-gray-200 border-4 lg:w-36 md:w-28 w-20 md:h-28 lg:h-36 h-20 flex justify-center items-center hover:bg-light">
                <FontAwesomeIcon icon={faHandsPraying} className="md:text-6xl lg:text-7xl text-4xl text-gray-200"/>
            </div>
                <p className="text-gray-200 mt-3 md:text-xl">WORSHIP</p>
           </div>
           <div className="flex flex-col items-center">
             <div className=" border-gray-200 border-4 hover:bg-light lg:w-36 md:w-28 w-20 md:h-28 lg:h-36 h-20 flex justify-center items-center ">
                <FontAwesomeIcon icon={faBookBible} className="md:text-6xl lg:text-7xl text-4xl text-gray-200"/>
            </div>
                <p className="text-gray-200 mt-3 md:text-xl">TEACHINGS</p>
           </div>
           <div className="flex flex-col items-center">
             <div className=" border-gray-200 border-4 hover:bg-light lg:w-36 md:w-28 w-20 md:h-28 lg:h-36 h-20 flex justify-center items-center ">
                <FontAwesomeIcon icon={faUsers} className="md:text-6xl lg:text-7xl text-4xl text-gray-200"/>
            </div>
                <p className="text-gray-200 mt-3 md:text-xl">FELLOWSHIP</p>
           </div>
           <div className="flex flex-col items-center">
             <div className=" border-gray-200 border-4 hover:bg-light lg:w-36 md:w-28 w-20 md:h-28 lg:h-36 h-20 flex justify-center items-center ">
                <FontAwesomeIcon icon={faPray} className="md:text-6xl lg:text-7xl text-4xl text-gray-200"/>
            </div>
                <p className="text-gray-200 mt-3 md:text-xl">PRAYERS</p>
           </div>

            
        </div>
      </div>
    </div>
  );
};

export default AboutIcons;
