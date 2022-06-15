import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../functions/subCategories";

const SubCategoriesList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubCategories().then((res) => {
      setSubCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showSubCategories = () =>
    subCategories.map((s) => (
      <Col
        key={s._id}
        className="btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/subcategories/${s.slug}`}>{s.name}</Link>
      </Col>
    ));

  return (
    <Container className="">
      <Row className="">
        {loading ? <h4 className="text-center">Loading...</h4> : showSubCategories()}
      </Row>
    </Container>
  );
};

export default SubCategoriesList;