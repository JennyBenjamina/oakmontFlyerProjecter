import React, { useEffect } from "react";
import MyCarousel from "../Components/MyCarousel";

function Etiquette({ setIsLoading }) {
  return <MyCarousel setIsLoading={setIsLoading} category={"etiquette"} />;
}

export default Etiquette;
