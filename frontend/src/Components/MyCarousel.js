import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import axios from "axios";
import DateComponent from "./DateComponent";

const MyCarousel = ({ category, setIsLoading }) => {
  const REACT_APP_SERVER_URL =
    process.env.NODE_ENV === "production"
      ? "https://king-prawn-app-2-jjatv.ondigitalocean.app"
      : "http://localhost:5000";

  console.log(process.env.test);

  const [images, setImages] = useState(null);
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
          `${REACT_APP_SERVER_URL}/images?month=${month}&year=${year}&category=${category}`
        )
        .then((response) => {
          console.log(response.data);
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
  };

  return (
    <div className="files-upload">
      {showCarousel ? null : (
        <>
          {" "}
          <DateComponent onDateChange={handleDateChange} />
          <Button
            className="m-3"
            variant="primary"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </>
      )}
      {showCarousel ? (
        <Carousel
          interval={3500}
          indicators={false}
          controls={false}
          fade={true}
        >
          {images ? (
            images.map((image, index) => (
              <Carousel.Item
                key={index}
                style={{ height: "100vh", width: "100vw" }}
              >
                <img
                  className="d-block img-fluid"
                  src={`${REACT_APP_SERVER_URL}/images/${image}`}
                  alt={`Slide ${index + 1}`}
                  style={{ objectFit: "", height: "100%" }}
                />
              </Carousel.Item>
            ))
          ) : (
            <div> No images found</div>
          )}
        </Carousel>
      ) : null}
    </div>
  );
};

export default MyCarousel;
