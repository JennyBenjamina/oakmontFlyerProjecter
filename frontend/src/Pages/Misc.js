import React, { useEffect } from "react";
import MyCarousel from "../Components/MyCarousel";

function Misc({ setIsLoading }) {
  return <MyCarousel setIsLoading={setIsLoading} category={"misc"} />;
}

export default Misc;
