import Navigation from "../components/navigation/";
import Sidebar from "../components/navigation/sidebar";
import InfoSection from "../components/InfoSection";
import Hero from "../components/HeroSection";
import React, { useState } from "react";
import {
  HomeObjOne,
  HomeObjThree,
  HomeObjTwo,
} from "../components/InfoSection/data";
import Services from "../components/Services";
import Footer from "../components/footer";

const Home = ({setIsHome}) => {
  const [isOpen, setIsOpen] = useState(false);
  setIsHome(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  console.log("isOpen: ", isOpen);

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Hero />
      <InfoSection {...HomeObjOne} />
      <InfoSection {...HomeObjTwo} />
      <Services />
      <InfoSection {...HomeObjThree} />
      <Footer />
    </>
  );
};

export default Home;
