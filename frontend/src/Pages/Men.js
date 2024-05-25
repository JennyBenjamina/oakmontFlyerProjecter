import React, { useEffect } from "react";
import MyCarousel from "../Components/MyCarousel";

function Men({ setIsLoading }) {
  return (
    <>
      <h1 className="files-upload">Men's Events</h1>
      <MyCarousel setIsLoading={setIsLoading} category={"men"} />
    </>
  );
}

export default Men;
