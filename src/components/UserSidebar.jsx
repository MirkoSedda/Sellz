import React from "react";
import { Link } from "react-router-dom";

export const UserSidebar = () => (
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/userDashboard" className="nav-link">
                    Dashboard
                </Link>
            </li>

            {/* <li className="nav-item">
                <Link to="/password" className="nav-link">
                    Password
                </Link>
            </li> */}

            <li className="nav-item">
                <Link to="/wishlist" className="nav-link">
                    Wishlist
                </Link>
            </li>
        </ul>
    </nav>
);


