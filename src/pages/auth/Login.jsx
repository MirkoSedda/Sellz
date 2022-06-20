
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { MailOutlined } from "@ant-design/icons";
// import { GoogleOutlined } from "@ant-design/icons";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loginUser from "../../redux/actions";
import validateInputs from "../../functions/validateInputs";

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('admin@admin.com');
    const [password, setPassword] = useState('admin');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const userData = { email, password };

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            setLoading(true)
            console.log(userData);
            validateInputs(email, password)
            dispatch(loginUser(userData))
            setEmail("")
            setPassword("")
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error(error.message);
            setError(true)
            setLoading(false)
        }
    }

    const loginForm = () => (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
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
                className="mb-3"
                block
                shape="round"
                icon={<MailOutlined />}
                size="large"
            >
                Login with email and password
            </Button>
        </Form>
    );

    return (
        <Container className="p-5">
            <Row>
                <Col md={6} className="offset-md-3">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Login</h4>
                    )}
                    {loginForm()}

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
                </Col>
            </Row>
        </Container>
    )
}

export default Login