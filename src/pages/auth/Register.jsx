import { useState } from "react"
// import { registerUserAxios } from "../../utils/userFetch"
import { registerUserFetch } from "../../utils/userFetch"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate()

    const [name, nameSetter] = useState("m")
    const [surname, surnameSetter] = useState("m")
    const [email, emailSetter] = useState("m@m.com")
    const [password, passwordSetter] = useState("m")

    const user = { name, surname, email, password }

    const handleName = e => nameSetter(e.target.value)
    const handleSurname = e => surnameSetter(e.target.value)
    const handleEmail = e => emailSetter(e.target.value)
    const handlePassword = e => passwordSetter(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()
        registerUserFetch(user)
        console.log(user)
        nameSetter("")
        surnameSetter("")
        emailSetter("")
        passwordSetter("")
        navigate("/login")
    }

    return (
        <Container>
            <h4>Register</h4>
            <ToastContainer />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={handleName}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Surname"
                        value={surname}
                        onChange={handleSurname}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmail}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePassword}
                    />
                </Form.Group>
                <Button variant="dark" type="submit" onClick={handleSubmit}>
                    Register
                </Button>
            </Form>
        </Container>
    )
}
