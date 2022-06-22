
import { Link } from "react-router-dom";

const AdminSidebar = () => (
    <nav className="mt-5 pt-5">
        <ul className="nav flex-column">
            <li className="nav-item pb-4">
                <Link to="/admin/dashboard" className="nav-link text-black">
                    Dashboard
                </Link>
            </li>

            <li className="nav-item pb-4">
                <Link to="/admin/product" className="nav-link text-black">
                    Create product
                </Link>
            </li>

            <li className="nav-item pb-4">
                <Link to="/admin/products" className="nav-link text-black">
                    See all Products
                </Link>
            </li>

            <li className="nav-item pb-4">
                <Link to="/admin/categories" className="nav-link text-black">
                    Create or modify Categories
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/subcategories" className="nav-link text-black">
                    Create or modify Sub Category
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/coupon" className="nav-link text-black">
                    Coupon
                </Link>
            </li>
        </ul>
    </nav>
);

export default AdminSidebar
