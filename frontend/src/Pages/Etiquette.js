import React, { useEffect } from "react";
import MyCarousel from "../Components/MyCarousel";

function Etiquette({ setIsLoading }) {
  return (
    <>
      <h1 className="files-upload">Course Etiquette</h1>){" "}
      <MyCarousel setIsLoading={setIsLoading} category={"etiquette"} />;
    </>
  );
}

export default Etiquette;
