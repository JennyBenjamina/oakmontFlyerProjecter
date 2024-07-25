import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h1 className="text-center">Unauthorized</h1>
      <br />
      <p className="text-center">You are not authorized to view this page.</p>
      <Button onClick={goBack}>Go Home</Button>
    </Container>
  );
};

export default Unauthorized;
