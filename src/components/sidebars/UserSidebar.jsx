
import { Link } from "react-router-dom";

const UserSidebar = () => (
    <nav className="mt-5 pt-5">
        <ul className="nav flex-column ">
            <li className="nav-item pb-4">
                <Link to="/user/history" className="text-black nav-link">
                    History
                </Link>
            </li>
            {/* TODO implement password recovery functionality
             <li className="nav-item">
                <Link to="/user/password" className="nav-link">
                    Password
                </Link>
            </li> */}
            <li className="nav-item">
                <Link to="/user/wishlist" className="text-black nav-link">
                    Wishlist
                </Link>
            </li>
        </ul>
    </nav>
);

export default UserSidebar
