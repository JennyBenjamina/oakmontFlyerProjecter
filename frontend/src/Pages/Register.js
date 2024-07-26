import { useRef, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const tooltipMessages = {
    password:
      "8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character. Allowed special characters: ! @ # $ %",
    confirm: "Must match the first password input field.",
    user: "4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.",
  };

  const renderTooltip = (type, props) => {
    const message = tooltipMessages[type] || "Invalid tooltip type"; // Default message or error handling
    return (
      <Tooltip id="button-tooltip" {...props}>
        {message}
      </Tooltip>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    const payload = {
      user: user,
      pwd: pwd,
    };
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify(payload), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Container className="mt-5 login_register_container">
          <Row className="justify-content-md-center">
            <Col xs={12} md={8}>
              <Alert variant="success">
                <Alert.Heading>Success!</Alert.Heading>
                <p>
                  <Link to="/">Sign In</Link>
                </p>
              </Alert>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container
          className="mt-5 login_register_container"
          style={{ maxWidth: "500px" }}
        >
          <Row className="justify-content-md-center">
            <Col xs={12} md={8}>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Register</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username:</Form.Label>
                  <InputGroup>
                    {windowWidth > 768 ? (
                      <OverlayTrigger
                        placement="right"
                        show={!validName && userFocus}
                        overlay={renderTooltip("user")}
                      >
                        <Form.Control
                          type="text"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required
                          aria-invalid={validName ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                        />
                      </OverlayTrigger>
                    ) : (
                      <>
                        <Form.Control
                          type="text"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required
                          aria-invalid={validName ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                        />
                        {!validName && userFocus && (
                          <Form.Text id="uidnote" muted>
                            4 to 24 characters. Must begin with a letter.
                            Letters,
                          </Form.Text>
                        )}
                      </>
                    )}
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password:</Form.Label>

                  {windowWidth > 768 ? (
                    <OverlayTrigger
                      placement="right"
                      show={!validPwd && pwdFocus}
                      overlay={renderTooltip("password")}
                    >
                      <Form.Control
                        type="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                      />
                    </OverlayTrigger>
                  ) : (
                    <>
                      <Form.Control
                        type="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                      />
                      {!validPwd && pwdFocus && (
                        <Form.Text id="pwdNeed" muted>
                          8 to 24 characters. Must include uppercase and
                          lowercase letters, a number, and a special character.
                          Allowed special characters: ! @ # $ %
                        </Form.Text>
                      )}
                    </>
                  )}
                  <InputGroup></InputGroup>
                </Form.Group>

                <Form.Group controlId="confirm_pwd">
                  <Form.Label>Confirm Password:</Form.Label>
                  {windowWidth > 768 ? (
                    <OverlayTrigger
                      placement="right"
                      show={!validMatch && matchFocus}
                      overlay={renderTooltip("confirm")}
                    >
                      <Form.Control
                        type="password"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                      />
                    </OverlayTrigger>
                  ) : (
                    <>
                      <Form.Control
                        type="password"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                      />
                      {!validMatch && matchFocus && (
                        <Form.Text id="confirmnote" muted>
                          Passwords need to match.
                        </Form.Text>
                      )}
                    </>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3"
                  disabled={!validName || !validPwd || !validMatch}
                >
                  Sign Up
                </Button>
              </Form>
              <p className="mt-3">
                Already registered?
                <br />
                <Link to="/signIn">Sign In</Link>
              </p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Register;
