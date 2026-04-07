import React from "react";
import Wellcom from "../pages/resort/Wellcom";
import ResortSectionTwo from "./resort/ResortSectionTwo";
import ResortBanner from "./resort/ResortBanner";
import ResortSectionThree from "./resort/ResortSectionThree";
import ResortSectionFour from "./resort/ResortSectionFour";
import ResortSectionFive from "./resort/ResortSectionFive";
import ResortSectionSix from "./resort/ResortSectionSix";
import ResortSectionSeven from "./resort/ResortSectionSeven";
import ResortSectionEight from "./resort/ResortSectionEight";

export default function Home() {
  return (
    <>
      <Wellcom />
      <ResortSectionTwo />
      <ResortBanner />
      <ResortSectionThree />
      <ResortSectionFour />
      <ResortSectionFive />
      <ResortSectionSix />
      <ResortSectionSeven />
      <ResortSectionEight />
    </>
  );
}