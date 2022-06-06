import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { getProduct } from "../../functions/products";
import { SingleProduct } from "../../components/cards/SingleProduct";


export const Product = () => {
    const [product, setProduct] = useState({});
    const params = useParams()
    const { slug } = params;

    useEffect(() => {
        loadSingleProduct();
        // eslint-disable-next-line 
    }, [slug]);

    const loadSingleProduct = () =>
        getProduct(slug).then((res) => setProduct(res.data));

    return (

        <Container>
            <Row className="pt-4">
                <SingleProduct product={product} />
            </Row>
            <Row>
                <Col className="text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};


