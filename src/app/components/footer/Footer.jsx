"use client"

import React, { useState, useEffect } from 'react'
import MobileFooter from './MobileFooter';
import DesktopFooter from './DesktopFooter';

function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    console.log("RESIZED")
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div>
      {isMobile ? <MobileFooter /> : <DesktopFooter />}
    </div>
  )
}

export default Footer