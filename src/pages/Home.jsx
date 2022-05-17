import { MDBBtn } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOut = () => {
        dispatch({ type: 'LOGOUT', payload: null });
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('user');
        navigate('/');
    }
    return (
        <MDBBtn onClick={logOut}>logout</MDBBtn>
    )
}