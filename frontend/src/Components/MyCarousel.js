import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";

import axiosInstance from "../api/axios";
import DateComponent from "./DateComponent";

const MyCarousel = ({ category }) => {
  {
    /* <div>
          <video
            src="https://d14dew3747d7ve.cloudfront.net/123/58bbb7b5-4d05-4840-9b4f-e93cfa0f2080"
            // controls
            muted
            autoPlay
            loop
            preload="auto"
            width="640"
            height="360"
          />
        </div> */
  }

  const [show, setShow] = useState(true);

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
      axiosInstance
        .get(`/api/images?month=${month}&year=${year}&category=${category}`)
        .then((response) => {
          if (response.data === "No files found") {
            setImages(["No files found"]);

            console.log("no images", images);
            setTimeout(() => {
              setShowCarousel(false);
            }, 3000); // 3000 milliseconds = 3 seconds
            return;
          }
          setImages(response.data);
        })
        .catch((error) => {
          console.log("err", error);
        });
    }
  }, [category, showCarousel, month, year]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowCarousel(true);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setShowCarousel(false);
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div className="files-upload">
        <DateComponent onDateChange={handleDateChange} />
        <Button
          className="m-3"
          variant="success"
          type="button"
          onClick={handleSubmit}
        >
          Present
        </Button>
      </div>
      {showCarousel ? (
        <Modal show={show} onHide={handleClose} fullscreen={true}>
          <Modal.Body>
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              interval={3500}
              indicators={true}
              controls={false}
              fade={true}
            >
              {images.length > 0 ? (
                images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block "
                      src={`https://d14dew3747d7ve.cloudfront.net/${image}`}
                      alt={`Slide ${index + 1}`}
                      style={{
                        height: "100vh",
                        margin: "0 auto",
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
          </Modal.Body>
        </Modal>
      ) : null}
    </>
  );
};

export default MyCarousel;
