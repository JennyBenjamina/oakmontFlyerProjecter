import React, { useEffect } from "react";
import MyCarousel from "../Components/MyCarousel";

function Misc({ setIsLoading }) {
  return (
    <>
      <h1 className="files-upload Home">Miscellaneous</h1>
      <MyCarousel setIsLoading={setIsLoading} category={"misc"} />;{" "}
    </>
  );
}

export default Misc;
