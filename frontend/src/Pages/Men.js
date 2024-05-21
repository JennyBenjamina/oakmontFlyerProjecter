import React, { useEffect } from "react";
import MyCarousel from "../Components/MyCarousel";

function Men({ setIsLoading }) {
  return <MyCarousel setIsLoading={setIsLoading} category={"men"} />;
}

export default Men;
