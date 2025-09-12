import React from "react";

const AboutHero = () => {
  return (
    <div className="relative h-screen lg:max-h-[800px] max-h-[600px] bg-[url('/assets/hero.jpg')] bg-top bg-cover bg-no-repeat flex items-center justify-center pt-20">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(78,52,46,0.6)]"></div>

      {/* Content */}
      <div className="relative w-full flex justify-center items-center px-6 text-center text-white z-10">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-4 uppercase">About</h2>
          <p className="mb-4 text-xl pt-5">happy happy</p>
          <p className="italic text-yellow-200 text-lg font-bold">
            qwadfgnvm
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;

