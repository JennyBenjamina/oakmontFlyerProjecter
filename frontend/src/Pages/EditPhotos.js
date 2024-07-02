import React, { useState } from "react";
import { Button, Form, ListGroup, Card } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import DateComponent from "../Components/DateComponent";
import axios from "axios";

function EditPhotos() {
  const [photos, setPhotos] = useState([]);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const categories = ["men", "women", "misc", "etiquette", "all"];
  const [category, setCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);

  const handleDelete = (photo) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/deleteFile`, {
        data: { id: photo.id, filename: photo.filename },
      })
      .then(() => {
        setPhotos(photos.filter((p) => p._id !== photo._id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDateChange = (date) => {
    setMonth(date.getMonth() + 1); // getMonth() returns a zero-based month, so add 1
    setYear(date.getFullYear());
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/imageNames?month=${month}&year=${year}&category=${category}`
      )
      .then((response) => {
        if (response.data === "No files found") {
          setPhotos([]);
          setLoading(false);
          return;
        }
        setPhotos(response.data);
        setLoading(false);
        console.log("photos", response.data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  return (
    <div className="files-upload Home">
      <h1>Remove Photos</h1>
      <div className="m-3">
        <Form.Select onChange={handleCategoryChange} value={category}>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
      </div>
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
        <Card className="m-3">
          <Card.Header>Photos</Card.Header>
          <Card.Body>
            {/* {photos.map((photo, index) => (
              <ListGroup
                key={index}
                horizontal
                className="justify-content-between m-3"
                style={{
                  padding: "1rem",
                }}
              >
                <ListGroup.Item className="m-2">
                  {photo.filename}
                </ListGroup.Item>
                <Button
                  className="m-2"
                  variant="danger"
                  onClick={() => handleDelete(photo)}
                >
                  Delete
                </Button>
              </ListGroup>
            ))} */}

            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : photos.length > 0 ? (
              photos.map((photo, index) => (
                <ListGroup
                  key={index}
                  horizontal
                  className="justify-content-between m-3"
                  style={{
                    padding: "1rem",
                  }}
                >
                  <ListGroup.Item className="m-2">
                    {photo.filename}
                  </ListGroup.Item>
                  <Button
                    className="m-2"
                    variant="danger"
                    onClick={() => handleDelete(photo)}
                  >
                    Delete
                  </Button>
                </ListGroup>
              ))
            ) : (
              <div>No photos available.</div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default EditPhotos;
