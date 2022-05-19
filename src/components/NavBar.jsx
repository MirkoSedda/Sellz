import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';


export default function NavBar() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer?.user.name);
    const admin = useSelector((state) => state.userReducer?.user.role);
    console.log(admin);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT', payload: null });
        navigate('/');
    }

    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                        {admin && <>
                            <Nav.Link ><Link to="/dashboard">Dashboard</Link></Nav.Link>
                        </>}
                        {!user && <>
                            <Nav.Link ><Link to="/login">Login</Link></Nav.Link>
                            <Nav.Link ><Link to="/register">Register</Link></Nav.Link>
                        </>}
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button color='dark'
                            type="submit" variant="dark">
                            Search
                        </Button>
                    </Form>
                    {user && <>
                        <div className="text-white">{`Hello ${user}`}</div>
                        <Button variant="dark"
                            onClick={logOut}>
                            Logout
                        </Button>
                    </>}
                </Navbar.Collapse>
            </Navbar >
        </Container >
    );
}
