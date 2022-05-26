
import {
    Container,
    Navbar,
    Form,
    Nav,
    FormControl,
    NavDropdown,
} from "react-bootstrap";
import { BsPersonCircle, BsCartPlus, BsPercent } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'

export const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRole = useSelector((state) => state.userReducer?.user.role);
    const user = useSelector((state) => state.userReducer?.user.name);

    const logout = () => {
        dispatch({ type: 'LOGOUT', payload: null });
        navigate('/');
    }

    return (
        <Navbar bg="dark" expand="sm" className="p-0" sticky="top">
            <Container>
                <Navbar.Brand href="#" className="mr-5">
                    <Link to={"/"} style={{ textDecoration: "none" }}>
                        <div className="d-flex flex-column align-items-center">
                            {/* <img src={ } alt="" className="navLogo py-1" /> */}
                            <p className="my-0 whiteText">Sellz</p>
                        </div>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="whiteText ml-3">
                    <Nav.Link href="#action1" className="whiteText">
                        <MdOutlineLocalOffer className="navIcons" />
                    </Nav.Link>
                    <Nav.Link href="#action2" className="whiteText">
                        <BsPercent className="navIcons" />
                    </Nav.Link>
                    <Form className=" d-flex w-50 ml-1">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                </Navbar.Collapse>
                <div className="d-flex flex-column align-items-center px-1 ml-3 ">
                    <BsCartPlus className="navIcons" />
                </div>
                {user && <div className={"text-white ms-4"}>{`Hello ${user}`} </div>}
                {!user && (
                    <>
                        <Link to={"/login"} className={"text-white ms-4"}>Login</Link>
                        <Link to={"/register"} className={"text-white ms-4"}>Register</Link>
                    </>
                )}
                {user && (
                    <NavDropdown
                        title={<BsPersonCircle className="navIcons" />}
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item>
                            {userRole && userRole === "Admin" && (
                                <Link to="/admin/dashboard" >
                                    Dashboard
                                </Link>
                            )}
                            {userRole && userRole === "User" && (
                                <Link to="/user/history" >
                                    Dashboard
                                </Link>
                            )}
                        </NavDropdown.Item>
                        {userRole && (
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        )}
                    </NavDropdown>
                )}
            </Container>
        </Navbar>
    );
}
