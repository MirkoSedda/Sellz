
import { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Pagination } from "antd";
import { ProductCard } from '../cards/ProductCard';
import { getProductsByParams, getProductsCountTotal } from '../../functions/products';
import { LoadingCard } from '../cards/LoadingCard';

export const BestSellers = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(null);
    const [page, setPage] = useState(1);

    const totalPages = (productsCount / 3) * 10

    useEffect(() => {
        loadAllProducts();
        // eslint-disable-next-line 
    }, [page]);

    useEffect(() => {
        getProductsCountTotal().then((res) => {
            setProductsCount(res.data.totalNumberOfProducts);
        })
        // eslint-disable-next-line 
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        // sort, order, limit
        getProductsByParams("sold", "desc", page).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };

    return (

        <Container>
            {loading ? (
                <LoadingCard count={3} />
            ) : (
                <Row>
                    <h4 className="text-center my-4">Best Sellers</h4>
                    {products.map((product) => (
                        <Col md={4} key={product._id} className="">
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            )}
            <Row>
                <Col className="text-center pt-5 p-3">
                    {/* TODO last page doesnt render with less than 3 products */}
                    <Pagination
                        current={page}
                        // 3 is the number of items per page
                        total={totalPages}
                        onChange={(value) => setPage(value)}
                    />
                </Col>
            </Row>
        </Container>
    );
};



