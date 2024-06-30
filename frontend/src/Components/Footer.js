import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import logoImage from "../assets/logo-footer.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="py-3 ">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={4}>
            <Image src={logoImage} alt="Company Logo" />
          </Col>
          <Col xs={6} md={4}>
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.facebook.com/yourcompany">Facebook</a>
              </li>
              <li>
                <a href="https://www.twitter.com/yourcompany">Twitter</a>
              </li>
              <li>
                <a href="https://www.instagram.com/yourcompany">Instagram</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            © 2024 Alternate Shot Marketing. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
