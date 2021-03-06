
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserSidebar from "../../components/sidebars/UserSidebar";
import { getWishlist, removeFromWishlist } from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);

    const accessToken = useSelector(state => state.user?.accessToken)

    useEffect(() => {
        loadWishlist();
        // eslint-disable-next-line
    }, []);

    const loadWishlist = () =>
        getWishlist(accessToken).then((res) => {
            console.log("🚀 ~ file: Wishlist.jsx ~ line 27 ~ getWishlist ~ res.data", res.data)
            setWishlist(res.data.wishlist);
        });

    const handleRemove = (productId) =>
        removeFromWishlist(productId, accessToken).then((res) => {
            console.log("🚀 ~ file: Wishlist.jsx ~ line 31 ~ removeWishlist ~ res", res)
            loadWishlist();
        });

    return (

        <Container className="mt-5">
            <Row>
                <Col md={2}>
                    <UserSidebar />
                </Col>
                <Col md={10} >
                    <h4 className="text-center">Wishlist</h4>
                    {wishlist?.map((p) => (
                        <div key={p._id} className="mt-5 ps-5 alert alert-secondary">
                            <Link to={`/product/${p.slug}`} className="text-black">{p.title}</Link>
                            <span
                                onClick={() => handleRemove(p._id)}
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-black" />
                            </span>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default Wishlist;