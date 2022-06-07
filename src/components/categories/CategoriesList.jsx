import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/categories"

export const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories().then((c) => {
            console.log(JSON.stringify(c.data, null, 4));
            setCategories(c.data);
            setLoading(false);
        });
    }, []);

    const showCategories = () =>
        categories?.map((c) => (
            <Col
                key={c._id}
                className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
            >
                <Link to={`/categories/${c.slug}`}>{c.name}</Link>
            </Col>
        ));

    return (
        <Container className="">
            <Row className="">
                {loading ? (
                    <h4 className="text-center">Loading...</h4>
                ) : (
                    showCategories()
                )}
            </Row>
        </Container>
    );
};
