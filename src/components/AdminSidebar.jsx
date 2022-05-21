import React from "react";
import { Link } from "react-router-dom";

export const AdminSidebar = () => (
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                    Dashboard
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/product" className="nav-link">
                    Product
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/products" className="nav-link">
                    Products
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/categories" className="nav-link">
                    Categories
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/subcategories" className="nav-link">
                    Sub Category
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/coupon" className="nav-link">
                    Coupon
                </Link>
            </li>
        </ul>
    </nav>
);


