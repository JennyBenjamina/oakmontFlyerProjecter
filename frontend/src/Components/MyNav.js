import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

import logoImage from "../assets/logo.png";

const MyNav = () => {
  return (
    <Navbar className="navbar-custom " expand="lg">
      <Container>
        {/* <LinkContainer to="/" style={{ cursor: "pointer" }}> */}
        <Navbar.Brand
          href="https://oakmontcc.com"
          target="_blank"
          style={{ cursor: "pointer" }}
        >
          <img
            src={logoImage}
            alt="logo"
            style={{ height: "200px", width: "200px" }}
          />
        </Navbar.Brand>
        {/* </LinkContainer> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-around"
        >
          <Nav>
            <LinkContainer to="/" style={{ cursor: "pointer" }}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/mens_events" style={{ cursor: "pointer" }}>
              <Nav.Link>Men</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/womens_events" style={{ cursor: "pointer" }}>
              <Nav.Link>Women</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/etiquette" style={{ cursor: "pointer" }}>
              <Nav.Link>Course Etiquette</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/misc" style={{ cursor: "pointer" }}>
              <Nav.Link>Misc</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="last-nav">
            <LinkContainer to="/edit_photos" style={{ cursor: "pointer" }}>
              <Nav.Link>Remove Flyers</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
