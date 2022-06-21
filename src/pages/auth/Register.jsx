
import Form from "react-bootstrap/Form";
import { useState } from "react"
import { registerUser } from "../../functions/user"
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"

const Register = () => {


    const [name, setName] = useState("m")
    const [surname, setSurname] = useState("m")
    const [email, setEmail] = useState("m@m.com")
    const [password, setPassword] = useState("m")
    const navigate = useNavigate()
    const user = { name, surname, email, password }

    const handleSubmit = e => {
        e.preventDefault()
        registerUser(user)
        console.log(user)
        setName("")
        setSurname("")
        setEmail("")
        setPassword("")
        navigate("/login")
    }

    const registrationForm = () => (

        <Form onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Control
                    type="name"
                    className=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoFocus
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="surname"
                    className=""
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Your surname"
                    autoFocus
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="email"
                    className=""
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
                    autoFocus
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
                Register with email and password
            </Button>
        </Form>
    );

    return (<div className="container p-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h4>Register</h4>
                {registrationForm()}
            </div>
        </div>
    </div>
    )
}

export default Register