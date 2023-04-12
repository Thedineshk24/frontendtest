import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto text-center">
        <p className="text-gray-300 text-sm">&copy; {new Date().getFullYear()} SpaceX Data Explorer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
