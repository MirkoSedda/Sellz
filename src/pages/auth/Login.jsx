
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions";
import { MDBContainer, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { ToastContainer } from 'react-toastify';
import { validateInputs } from "../../utils/validateInputs";

export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, emailSetter] = useState("m@m.com");
    const [password, passwordSetter] = useState("m");

    const user = { email, password };

    const handleEmail = e => emailSetter(e.target.value)
    const handlePassword = e => passwordSetter(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(user);
        validateInputs(email, password)
        dispatch(loginUser(user))
        emailSetter("")
        passwordSetter("")
        navigate("/")
    }

    return (
        <MDBContainer >
            <h4>Login</h4>
            <ToastContainer />
            <MDBInput
                label='Email input'
                id='typeEmail'
                type='email'
                contrast
                placeholder="Please provide email"
                value={email}
                onChange={handleEmail}
                autoFocus />
            <MDBInput
                label='Password input'
                id='typePassword'
                type='password'
                contrast
                placeholder="Please provide password"
                value={password}
                onChange={handlePassword} />
            <form onSubmit={handleSubmit}>
                <MDBBtn
                    type="submit"
                    onClick={handleSubmit}>
                    Login
                </MDBBtn>
            </form>
        </MDBContainer>
    );
}