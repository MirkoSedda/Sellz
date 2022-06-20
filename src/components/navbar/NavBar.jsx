
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";
import { BsPersonCircle, BsCartPlus, BsPercent } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import Search from "../forms/Search";

const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRole = useSelector((state) => state.user?.user?.role);
    const user = useSelector((state) => state.user?.user?.name);
    const { cart } = useSelector((state) => ({ ...state }));

    const logout = () => {
        dispatch({ type: 'LOGOUT', payload: null });
        dispatch({ type: 'ADD_TO_CART', payload: [] });
        localStorage.removeItem("cart");
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
                    <Link to="/shop" className="whiteText">
                        <MdOutlineLocalOffer className="navIcons" />
                    </Link>
                    <Nav.Link href="#action2" className="whiteText">
                        <BsPercent className="navIcons" />
                    </Nav.Link>
                </Navbar.Collapse>
                <Search />
                {user && (
                    <Link to="/cart" className="d-flex align-items-center px-1 ml-3 ">
                        {/* TODO change number of items color to white */}
                        <BsCartPlus className="navIcons mx-2" /> {cart.length}
                    </Link>
                )}
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

export default NavBar