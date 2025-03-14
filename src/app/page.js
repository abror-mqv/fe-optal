'use client'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeContent from "./components/home_content/HomeContent";
import BoxHeader from "./box/[box_id]/components/BoxHeader";
import { useEffect, useState } from "react";

export default function Home() {

  const [iii, setIII] = useState(true)
  useEffect(()=>{
    if((localStorage.getItem("SELLER_TYPE") == "BOX")){
      setIII(true)
    }else{
      setIII(false)
    }
  }, [window])
  return (
    <div>
      {
        iii?<BoxHeader/>:<Header />
      }      
      <HomeContent /> 
      <Footer />
    </div>
  );
}
