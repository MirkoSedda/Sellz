
import { useState } from "react"
import { registerUser } from "../../utils/fetch"
import { MDBInput, MDBContainer, MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate()

    const [name, nameSetter] = useState("m");
    const [surname, surnameSetter] = useState("m");
    const [email, emailSetter] = useState("m@m.com");
    const [password, passwordSetter] = useState("m");

    const user = { name, surname, email, password }

    const handleName = e => nameSetter(e.target.value)
    const handleSurname = e => surnameSetter(e.target.value)
    const handleEmail = e => emailSetter(e.target.value)
    const handlePassword = e => passwordSetter(e.target.value)

    const handleSubmit = e => {
        e.preventDefault();
        registerUser(user)
        console.log(user);
        nameSetter("")
        surnameSetter("")
        emailSetter("")
        passwordSetter("")
        navigate("/login")
    }

    return (
        <MDBContainer >
            <h4>Register</h4>
            <ToastContainer />
            <MDBInput
                label='Name'
                id='typeText'
                type='text'
                placeholder="Please provide name"
                contrast
                value={name}
                onChange={handleName}
            />
            <MDBInput
                label='Surname'
                id='typeText'
                type='text'
                placeholder="Please provide surname"
                contrast
                value={surname}
                onChange={handleSurname} />
            <MDBInput
                label='Email'
                id='typeEmail'
                type='email'
                placeholder="Please provide email"
                contrast
                value={email}
                onChange={handleEmail}
                autoFocus />
            <MDBInput
                label='Password'
                id='typePassword'
                type='password'
                placeholder="Please provide password"
                contrast
                value={password}
                onChange={handlePassword} />
            <form onSubmit={handleSubmit}>
                <MDBBtn
                    type="submit"
                    onClick={handleSubmit}>
                    Register
                </MDBBtn>
            </form>
        </MDBContainer>
    );
}
