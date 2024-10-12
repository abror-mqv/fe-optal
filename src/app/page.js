'use client'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeContent from "./components/home_content/HomeContent";
import StoreProvider from "./StoreProvider";
import { Provider } from 'react-redux';
import { useEffect } from "react";
import axios from "axios";

import { get_cats_tree } from "@/lib/features/counter/counterSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  

  return (
    <StoreProvider>
      <div>
        <Header />
        <HomeContent />
        <Footer />
      </div>
    </StoreProvider>
  );
}
