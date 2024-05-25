import React, { useEffect } from "react";
import MyCarousel from "../Components/MyCarousel";

function Women({ setIsLoading }) {
  return (
    <>
      <h1 className="files-upload">Women's Events</h1>
      <MyCarousel setIsLoading={setIsLoading} category={"women"} />;
    </>
  );
}

export default Women;
