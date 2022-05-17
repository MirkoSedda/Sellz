import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    // MDBDropdown,
    // MDBDropdownToggle,
    // MDBDropdownMenu,
    // MDBDropdownItem,
    // MDBDropdownLink,
    MDBCollapse
} from 'mdb-react-ui-kit';

export default function NavBar() {

    const [showBasic, setShowBasic] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT', payload: null });
        navigate('/');
    }

    return (
        <MDBNavbar expand='sm' dark bgColor='dark'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>
                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <Link to="/">
                                <MDBNavbarLink aria-current='page'>Home</MDBNavbarLink>
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <Link to="/shop">
                                <MDBNavbarLink>Shop</MDBNavbarLink>
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <Link to="/cart">
                                <MDBNavbarLink>Cart</MDBNavbarLink>
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <Link to="/login">
                                <MDBNavbarLink>Login</MDBNavbarLink>
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <Link to="/register">
                                <MDBNavbarLink>Register</MDBNavbarLink>
                            </Link>
                        </MDBNavbarItem>
                        {/* <MDBNavbarItem>
                               <MDBDropdown>
                                <MDBDropdownToggle tag='a' className='nav-link'>
                                    Dropdown
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink>Action</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink>Another action</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink>Something else here</MDBDropdownLink>
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem> */}
                    </MDBNavbarNav>
                    <form className='d-flex input-group w-auto'>
                        <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
                        <MDBBtn color='dark'>Search</MDBBtn>
                    </form>
                    <MDBBtn color='dark'
                        onClick={logOut}>Logout</MDBBtn>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}
