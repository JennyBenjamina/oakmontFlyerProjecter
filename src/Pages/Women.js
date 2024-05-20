import React, { useEffect } from "react";
import MyCarousel from "../Components/MyCarousel";

function Women({ setIsLoading }) {
  return <MyCarousel setIsLoading={setIsLoading} category={"women"} />;
}

export default Women;
