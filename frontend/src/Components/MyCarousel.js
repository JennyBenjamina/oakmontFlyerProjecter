import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import DateComponent from "./DateComponent";

const MyCarousel = ({ category, setIsLoading }) => {
  const [images, setImages] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [month, setMonth] = useState(months.indexOf("January") + 1);
  const [year, setYear] = useState("2024");

  const handleDateChange = (date) => {
    setMonth(date.getMonth() + 1); // getMonth() returns a zero-based month, so add 1
    setYear(date.getFullYear());
  };

  useEffect(() => {
    if (showCarousel) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/images?month=${month}&year=${year}&category=${category}`
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "No files found") {
            setImages(["No files found"]);
            return;
          }
          setImages(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("err", error);
        });
    }
  }, [category, showCarousel, month, year]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowCarousel(true);
    console.log(showCarousel);

    if (images[0] === "No files found" || images.length === 0) {
      setTimeout(() => {
        setShowCarousel(false);
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  };

  return (
    <>
      {showCarousel ? null : (
        <div className="files-upload">
          <DateComponent onDateChange={handleDateChange} />
          <Button
            className="m-3"
            variant="success"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      )}
      {showCarousel ? (
        <Carousel
          interval={3500}
          indicators={false}
          controls={false}
          fade={true}
        >
          {images.length > 0 ? (
            images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block "
                  src={`${process.env.REACT_APP_SERVER_URL}/images/${image}`}
                  alt={`Slide ${index + 1}`}
                  style={{
                    height: "100%",
                    border: "4px solid black",
                  }}
                />
              </Carousel.Item>
            ))
          ) : (
            <ProgressBar
              className="mt-4"
              variant="success"
              animated
              now={100}
            />
          )}
        </Carousel>
      ) : null}
    </>
  );
};

export default MyCarousel;
