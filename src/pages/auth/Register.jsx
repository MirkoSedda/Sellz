import { useState } from "react"
import { registerUser } from "../../utils/userFetch"
import { toast } from "react-toastify"
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"

export const Register = () => {


    const [name, nameSetter] = useState("m")
    const [surname, surnameSetter] = useState("m")
    const [email, emailSetter] = useState("m@m.com")
    const [password, passwordSetter] = useState("m")
    const navigate = useNavigate()
    const user = { name, surname, email, password }

    const handleSubmit = e => {
        e.preventDefault()
        registerUser(user)
        console.log(user)
        nameSetter("")
        surnameSetter("")
        emailSetter("")
        passwordSetter("")
        navigate("/login")
    }

    const registrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="name"
                className="form-control"
                value={name}
                onChange={(e) => nameSetter(e.target.value)}
                placeholder="Your name"
                autoFocus
            />
            <input
                type="surname"
                className="form-control"
                value={surname}
                onChange={(e) => surnameSetter(e.target.value)}
                placeholder="Your surname"
                autoFocus
            />
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => emailSetter(e.target.value)}
                placeholder="Your email"
                autoFocus
            />
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => passwordSetter(e.target.value)}
                placeholder="Your password"
                autoFocus
            />
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
                Login with Email/Password
            </Button>
        </form>
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
