import React, { useEffect, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";

import DateComponent from "../Components/DateComponent";
import axios from "axios";

function EditPhotos({ setIsLoading }) {
  const [photos, setPhotos] = useState([]);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const categories = ["men", "women", "misc", "etiquette"];
  const [category, setCategory] = useState(categories[0]);

  const handleDelete = (id) => {
    // Replace with your own API endpoint
    // axios.delete(`/api/photos/${id}`).then(() => {
    //   setPhotos(photos.filter((photo) => photo.id !== id));
    // });
  };

  const handleDateChange = (date) => {
    setMonth(date.getMonth() + 1); // getMonth() returns a zero-based month, so add 1
    setYear(date.getFullYear());
  };

  const handleCategoryChange = (event) => {
    setCategory(categories[event.target.value]);
    console.log("category", categories[event.target.value]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/imageNames?month=${month}&year=${year}&category=${category}`
      )
      .then((response) => {
        setPhotos(response.data);
        console.log("photos", response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  return (
    <div className="container">
      <h1>Edit Photos</h1>
      <Form.Select
        className="m-3 "
        onChange={handleCategoryChange}
        value={category}
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </Form.Select>
      <DateComponent onDateChange={handleDateChange} />
      <Button
        className="m-3"
        variant="success"
        type="button"
        onClick={handleSubmit}
      >
        Get Photos
      </Button>
      <div className="files-upload">
        {photos
          ? photos.map((photo) => (
              <ListGroup
                key={photo.id}
                horizontal
                className="justify-content-between m-3"
                variant="flush"
                style={{
                  border: "1px solid gray",
                  padding: "1rem",
                  borderRadius: "5px",
                }}
              >
                <ListGroup.Item className="m-2">{photo}</ListGroup.Item>
                <div>
                  <Button
                    className="m-2"
                    variant="danger"
                    onClick={() => handleDelete(photo.id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup>
            ))
          : null}
      </div>
    </div>
  );
}

export default EditPhotos;
