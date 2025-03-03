"use client"
import React, { useState, useEffect } from 'react'
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import { getExchangeRates } from '@/app/util/fetchExchangeRates';

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    getExchangeRates();
  }, []);

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
    <>
      {/* {isMobile ? <MobileHeader /> : <DesktopHeader />} */}
    </>
  )
}

export default Header