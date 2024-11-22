"use client"
import React, { useState, useEffect } from 'react'
import DesktopCatsComponent from './DesktopCatsComponent';

function DesktopCats() {
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
        <>
            {isMobile ? null : <DesktopCatsComponent />}
        </>
    )
}

export default DesktopCats