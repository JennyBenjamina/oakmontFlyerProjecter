import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import DateComponent from "./DateComponent";

const MyCarousel = ({ category, setIsLoading }) => {
  const [fullscreen, setFullscreen] = useState(true);
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
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/images?month=${month}&year=${year}&category=${category}`
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "No files found") {
            setImages(["No files found"]);

            console.log("images", images);
            setTimeout(() => {
              setShowCarousel(false);
            }, 3000); // 3000 milliseconds = 3 seconds
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
    setShow(true);
    console.log(showCarousel);
  };

  const handleClose = () => {
    setShow(false);
    setShowCarousel(false);
  };
  const handleShow = () => setShow(true);

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
          Submit
        </Button>
      </div>
      {showCarousel ? (
        <Modal show={show} onHide={handleClose} fullscreen={true}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};

export default MyCarousel;
