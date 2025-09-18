import React from 'react'

const elders =[
    {
        img: '/assets/placeholder.jpg',
        name:'Bischop Austin Ohaju'
    },
    {
        img: '/assets/placeholder.jpg',
        name:'Bischop Austin Ohaju'
    },
    {
        img: '/assets/placeholder.jpg',
        name:'Bischop Austin Ohaju'
    },
    {
        img: '/assets/placeholder.jpg',
        name:'Bischop Austin Ohaju'
    },
    {
        img: '/assets/placeholder.jpg',
        name:'Bischop Austin Ohaju'
    },
]

const deacons = [
    {
        img: '/assets/placeholder.jpg',
        name:'Deacon Felix Ajunwa'
    },
    {
        img: '/assets/placeholder.jpg',
        name:'Deacon Felix Ajunwa'
    },
    {
        img: '/assets/placeholder.jpg',
        name:'Deacon Felix Ajunwa'
    },
    {
        img: '/assets/placeholder.jpg',
        name:'Deacon Felix Ajunwa'
    },
    {
        img: '/assets/placeholder.jpg',
        name:'Deacon Felix Ajunwa'
    },
]

const Leader = () => {
  return (
    <div className='lg:px-16 px-8 md:px-10 py-20 bg-yellow-100'>
      <div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl  text-primary font-bold pb-16 text-center">MEET OUR ELDERS</h2>
        <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-16'>
        {elders.map((item, index) => (
            <div key={index}>
                <div className=''>
                    <img src={item.img} className='xl:w-48 xl:h-48 rounded-full'/>
                </div>
                <h3 className='text-xl text-center mt-4'>{item.name}</h3>
            </div>
        ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold md:pt-36 pt-20 pb-16 text-center">MEET OUR DEACONS</h2>
        <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-16'>
        {deacons.map((item, index) => (
            <div key={index}>
                <div className=''>
                    <img src={item.img} className='xl:w-48 xl:h-48'/>
                </div>
                <h3 className='text-xl text-center mt-4'>{item.name}</h3>
            </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Leader
