
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { AdminSidebar } from "../../../components/sidebars/AdminSidebar";
import { getProductsByParams } from "../../../functions/products";
import { AdminProductCard } from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/products";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const GetAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const accessToken = useSelector(state => state.userReducer?.accessToken)

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        //sort, order, limit
        getProductsByParams("createdAt", "desc", 3)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const handleRemove = (slug) => {
        console.log("send delete request", slug);
        removeProduct(slug, accessToken)
            .then((res) => {
                loadAllProducts();
                toast.error(`${res.data.title} is deleted`);
            })
            .catch((err) => {
                if (err.response.status === 400) toast.error(err.response.data);
                console.log(err);
            });
    }

    return (
        <Container>
            <Row>
                <Col md={2}>
                    <AdminSidebar />
                </Col>

                <Col md={10}>
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>All Products</h4>
                    )}
                    <div className="row">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-4 pb-3">
                                <AdminProductCard
                                    product={product}
                                    handleRemove={handleRemove}
                                />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};


