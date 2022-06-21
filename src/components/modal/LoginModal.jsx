import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { MailOutlined } from "@ant-design/icons";
import loginUser from "../../redux/actions/index"
import validateInputs from "../../functions/validateInputs";
// import { GoogleOutlined } from "@ant-design/icons";

const LoginModal = ({ handleShow, handleClose, show }) => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  const userData = { email, password };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      validateInputs(email, password);
      dispatch(loginUser(userData));
      setEmail("");
      setPassword("");
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setError(true)
      setLoading(false);
    }
  };

  return (
    <Container className="w-100 ">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="ms-3">
            Please login to complete the order.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Control
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                autoFocus
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                className=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
              />
            </Form.Group>

            <br />
            <Button
              onClick={handleSubmit}
              type="primary"
              className="text-center btn-dark text-white btn-block mb-3"
              block
              shape="round"
              icon={<MailOutlined />}
              size="large"
            >
              Login with email and password
            </Button>
            {/* <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        icon={<GoogleOutlined />}
                        size="large"
                    >
                        Login with Google
                    </Button> */}
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );

};

export default LoginModal;
