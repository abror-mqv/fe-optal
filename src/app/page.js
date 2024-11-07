'use client'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeContent from "./components/home_content/HomeContent";

import { Provider } from 'react-redux';
import { useEffect } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";

export default function Home() {


  return (
    <div>
      <Header />
      <HomeContent />
      <Footer />
    </div>
  );
}
