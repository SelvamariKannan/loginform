import React from "react";
import backgroundImage from '../assets/bg.png';

export default function Background() {
  return (
    <div className='bg-white' style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      height: '130vh',
      width: '100%',
      zIndex: '0',
      position: 'absolute',
      top: 0, 
      left: 0 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        height: '70px', 
        width: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 1 
      }}>
        {/* Navigation Bar Content */}
      </div>
    </div>
  );
}
