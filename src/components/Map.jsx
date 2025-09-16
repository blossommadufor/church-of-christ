import React from 'react'

const Map = () => {
  return (
    <div>
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
  )
}

export default Map
