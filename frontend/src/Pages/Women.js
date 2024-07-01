import React from "react";
import MyCarousel from "../Components/MyCarousel";

function Women({ setIsLoading }) {
  return (
    <>
      <h1 className="files-upload Home">Women's Events</h1>
      <MyCarousel setIsLoading={setIsLoading} category={"women"} />;
    </>
  );
}

export default Women;
