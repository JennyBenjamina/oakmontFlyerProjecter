import React, { useEffect } from "react";
import InputFiles from "../Components/InputFiles";
import { useState } from "react";
import DateComponent from "../Components/DateComponent";
import Category from "../Components/Category";
import { Button } from "react-bootstrap";
import axios from "axios";
import EndDate from "../Components/EndDate";

// work onthis later
function Home() {
  // Define state variables for month, year, and file in Home.js
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("men"); // default category
  const [load, setLoad] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

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

  const handleEndDateChange = (selectedDate) => {
    const encodedEndDate = encodeURIComponent(
      selectedDate.toISOString().split("T")[0]
    ); // For a Date object, convert to ISO string and keep the date part
    setEndDate(encodedEndDate);
    console.log("selectedDate", encodedEndDate);
  };

  const handleFileUpload = () => {
    if (file) {
      setLoad(true);
      const formData = new FormData();
      formData.append("img", file);
      console.log("file", file);

      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/addfile?month=${month}&year=${year}&category=${category}&endDate=${endDate}`,
          formData
        ) // this was formData
        .then((response) => {
          // handle the response
          console.log(response);
          setLoad(false);
        })
        .catch((error) => {
          console.error(error);
          setLoad(false);
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
          <EndDate onEndDateChange={handleEndDateChange} />
          <InputFiles
            key={load}
            onFileChange={handleFileChange}
            load={load}
            setLoad={setLoad}
          />

          <Button variant="success" type="button" onClick={handleFileUpload}>
            Upload File
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
