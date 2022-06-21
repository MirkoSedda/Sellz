
import { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Pagination } from "antd";
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { getProductsByParams } from '../../functions/products';

const BestSellers = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [current, setCurrent] = useState(1);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);
    const pageSize = 4

    useEffect(() => {
        loadAllProducts();
        // eslint-disable-next-line 
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByParams("sold", "desc").then((res) => {
            setProducts(res.data);
            setTotalPage(res.data.length / pageSize);
            setMaxIndex(pageSize);
        })
        setLoading(false);
    };

    const handleChange = (page) => {
        setCurrent(page)
        setMinIndex((page - 1) * pageSize)
        setMaxIndex(page * pageSize)
    };

    return (

        <Container>
            {loading ? (
                <LoadingCard count={3} />
            ) : (
                <Row>
                    {products.map((product, index) =>
                        index >= minIndex &&
                        index < maxIndex && (
                            (
                                <Col md={3} key={product._id} className="">
                                    <ProductCard product={product} />
                                </Col>
                            )))}
                </Row>
            )}
            <Row>
                <Col className="text-center pt-5 p-3">
                    <Pagination
                        pageSize={pageSize}
                        current={current}
                        total={products.length}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default BestSellers;

