'use client'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeContent from "./components/home_content/HomeContent";
import BoxHeader from "./box/[box_id]/components/BoxHeader";

export default function Home() {
  return (
    <div>
      {
        (localStorage.getItem("SELLER_TYPE") == "BOX")?<BoxHeader/>:<Header />
      }      
      <HomeContent /> 
      <Footer />
    </div>
  );
}
