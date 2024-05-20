import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

import logoImage from "../assets/logo.png";

const MyNav = () => {
  return (
    <Navbar className="navbar-custom " expand="lg">
      <Container>
        <LinkContainer to="/" style={{ cursor: "pointer" }}>
          <Navbar.Brand>
            <img
              src={logoImage}
              alt="logo"
              style={{ height: "200px", width: "200px" }}
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
