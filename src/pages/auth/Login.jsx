
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUser } from "../../redux/actions";
import { ToastContainer } from 'react-toastify';
import { validateInputs } from "../../utils/validateInputs";

export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, emailSetter] = useState('m@m.com');
    const [password, passwordSetter] = useState('m');
    const [loading, loadingSetter] = useState(false)
    const [error, errorSetter] = useState(false)

    const userData = { email, password };
    const user = useSelector((state) => state.userReducer?.user.name);

    const handleEmail = e => emailSetter(e.target.value)
    const handlePassword = e => passwordSetter(e.target.value)

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            loadingSetter(true)
            console.log(userData);
            validateInputs(email, password)
            dispatch(loginUser(userData))
            emailSetter("")
            passwordSetter("")
            loadingSetter(false)
        } catch (error) {
            console.log(error)
            errorSetter(true)
            loadingSetter(false)
        }
    }

    useEffect(() => user && navigate("/"), [navigate, user])

    return (
        <Container >
            {error && <div className="d-flex justify-content-center">Error</div>}
            {loading ? <div className="d-flex justify-content-center">loading...</div> : (
                <>
                    <h4>Login</h4>
                    <ToastContainer />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email}
                                onChange={handleEmail} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password}
                                onChange={handlePassword} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="dark" type="submit" onClick={handleSubmit}>
                            Login
                        </Button>
                    </Form>
                </>
            )}
        </Container>
    )
}

