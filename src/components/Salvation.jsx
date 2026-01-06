import { faPray } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const steps = [
    {
        step: 1,
        title: "Hear the Gospel",
        text: " Romans 10:17",

    },
    {
        step: 2,
        title: "Believe",
        text: "John 3:16; Romans 10:9",

    },
    {
        step: 3,
        title: "Repent of Your Sins",
        text: "Acts 3:19; Luke 13:3",

    },
    {
        step: 4,
        title: "Confess Jesus Christ",
        text: " Romans 10:10; Matthew 10:32",

    },
    {
        step: 5,
        title: "Be Baptized",
        text: " Acts 2:38; Mark 16:16",

    },
];

const Salvation = () => {
  return (
    <div className=" py-20 lg:px-16 px-8 md:px-10 bg-white">
      <div>
        <h2 className='pb-16 text-secondary text-3xl md:text-4xl lg:text-5xl text-center font-bold'>THE FIVE STEPS TO SALVATION</h2>
      </div>
      <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5'>
        {steps.map((item, index) => (
            <div className='bg-gray-200  px-4 py-6'>
            <div className='h-9 w-9 border-2 border-blue-600 flex items-center justify-center rounded-full'>
                <h3 className='text-lg text-gray-600 font-bold'>{item.step}</h3>
            </div>
                <h3 className='text-secondary text-lg font-semibold mt-3'>{item.title}</h3>
                <p className='mt-2 text-sm text-gray-700 leading-relaxed'>{item.text}</p>
            </div>
        ))}
      </div>
    </div>
  )}

export default Salvation
 