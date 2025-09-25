import React from "react";

const Question = () => {
  return (
    <div id="question" className="relative bg-[url('/assets/question.jpg')] bg-cover bg-center py-60 text-white text-center">
      <div className="bg-[rgba(38,41,77,0.8)] inset-0 absolute lg:px-24 md:px-16 px-8 flex flex-col justify-center items-center ">
        <div className="">
          <h3 className="lg:text-4xl text-2xl font-bold pb-6">DO YOU HAVE A QUESTION?</h3>
          <p className="lg:text-lg">
            Do you need clarifications on what true Christianity is all about or
            you have a topical question that bothers you? You can talk to us
            now.
          </p>
        </div>
      <div className="pt-14">
        <a href="/contact">
          <button className="py-3 px-6 bg-light text-white hover:bg-white hover:text-light font-semibold rounded-xl">
          CONTACT US
        </button>
        </a>
      </div>
      </div>
    </div>
  );
};

export default Question;
