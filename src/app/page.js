'use client'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeContent from "./components/home_content/HomeContent";

export default function Home() {
  return (
    <div>
      <Header />
      <HomeContent />
      <Footer />
    </div>
  );
}
