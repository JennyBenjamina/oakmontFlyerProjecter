import React from "react";
import Form from "react-bootstrap/Form";
import { Button, Modal, Spinner } from "react-bootstrap";

function InputFiles({ onFileChange, load, setLoad }) {
  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileChange(event.target.files[0]);
    }
  };

  return (
    <div className="input-files-container">
      <Form encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="lecturePdf">
          <Form.Label>Flyer photos (JPG or PNG)</Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload flyers"
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={handleFileUpload}
          />
        </Form.Group>
      </Form>
      {load ? (
        <Modal centered show={load} onHide={() => setLoad(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Please be patient...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Spinner
              animation="border"
              variant="success"
              style={{ marginLeft: "50px" }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setLoad(false)}>
              I have no patience
            </Button>
          </Modal.Footer>
        </Modal>
      ) : //
      null}
    </div>
  );
}

export default InputFiles;
