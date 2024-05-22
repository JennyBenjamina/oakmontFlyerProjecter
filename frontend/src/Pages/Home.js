import React, { useEffect } from "react";
import InputFiles from "../Components/InputFiles";
import { useState } from "react";
import DateComponent from "../Components/DateComponent";
import Category from "../Components/Category";
import { Button } from "react-bootstrap";
import axios from "axios";

// work onthis later
function Home() {
  // Define state variables for month, year, and file in Home.js
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("men"); // default category

  const handleDateChange = (date) => {
    console.log("handl date change: ", date);
    setMonth(date.getMonth() + 1); // getMonth() returns a zero-based month, so add 1
    setYear(date.getFullYear());
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("img", file);

      const REACT_APP_SERVER_URL =
        "https://seashell-app-6co28.ondigitalocean.app:5000";
      axios
        .post(
          `${REACT_APP_SERVER_URL}/addfile?month=${month}&year=${year}&category=${category}`,
          formData
        ) // this was formData
        .then((response) => {
          // handle the response
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="Home container mt-5">
      <div className="Home-left-box">
        <div className="Home-left-top text-center">
          <h2 className="Home-heading">
            Upload Flyers based on Month and Year
          </h2>
          <p className="Home-paragraph">
            This app takes your flyer and puts it in a photo carousel for the
            members to view.
          </p>
        </div>

        <div className="Home files-upload">
          <Category onCategoryChange={handleCategoryChange} />
          <DateComponent onDateChange={handleDateChange} />
          <InputFiles onFileChange={handleFileChange} />
          <Button variant="primary" type="button" onClick={handleFileUpload}>
            Upload File
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
