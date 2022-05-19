import React from "react";
import { Link } from "react-router-dom";

export const AdminSidebar = () => (
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                    Dashboard
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/product" className="nav-link">
                    Product
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/products" className="nav-link">
                    Products
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/category" className="nav-link">
                    Category
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/sub" className="nav-link">
                    Sub Category
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/coupon" className="nav-link">
                    Coupon
                </Link>
            </li>

            {/* <li className="nav-item">
                <Link to="/user/password" className="nav-link">
                    Password
                </Link>
            </li> */}
        </ul>
    </nav>
);


