import React from 'react';

const Banner = () => {
  const imageUrl = "https://sxcontent9668.azureedge.us/cms-assets/assets/STARSHIP_CAROUSEL_DESKTOP_Sunset_Full_Stack_031522_DJI_0066_544ff6b208.jpg";

  const bannerStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="h-screen bg-gray-100" style={bannerStyle}>
      <div className="container mx-auto text-center h-full flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-5 text-white">SpaceX Data Explorer</h1>
        <p className="text-xl font-semibold text-white">Discover SpaceX rockets and capsules data with this simple yet powerful application.</p>
      </div>
    </div>
  );
};

export default Banner;
