import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { getProduct } from "../../functions/products";
import { SingleProduct } from "../../components/cards/SingleProduct";
import { ProductCard } from "../../components/cards/ProductCard";
import { productRating, getRelatedProducts } from "../../functions/products";


export const Product = () => {

    const accessToken = useSelector(state => state.userReducer?.accessToken)
    const userId = useSelector(state => state.userReducer?.user._id)

    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [star, setStar] = useState(1)

    const params = useParams()
    const { slug } = params;

    useEffect(() => {
        loadSingleProduct();
        // eslint-disable-next-line 
    }, []);

    //check why the product is undefined: (
    useEffect(() => {
        if (userId && product.ratings) {
            const existingRatingObject = product.ratings.find(
                rating => rating.postedBy.toString() === userId.toString()
            )
            existingRatingObject && setStar(existingRatingObject.ratings.star)
        }
        // eslint-disable-next-line 
    }, []);

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data);
            // console.log(res.data);
            getRelatedProducts(res.data._id)
                .then((res) => {
                    // console.log(res.data);
                    setRelatedProducts(res.data)
                });
        });
    };

    const onStarClick = (newStar) => {
        setStar(newStar);
        productRating(userId, product._id, newStar, accessToken)
            .then((res) => {
                console.log("rating", res.data);
                loadSingleProduct();
            });
    };

    return (

        <Container>
            <Row className="pt-4">
                <SingleProduct
                    product={product}
                    onStarClick={onStarClick}
                    star={star}
                />
            </Row>
            <Row>
                <Col className="text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />
                </Col>
            </Row>
            <Row className=" pb-5">

                {relatedProducts?.length ? (
                    relatedProducts.map((relatedProduct) => (
                        <Col md={4} key={relatedProduct._id} className="">
                            <ProductCard product={relatedProduct} />
                        </Col>
                    ))
                ) : (
                    <Col className="text-center">No Products Found</Col>
                )}
            </Row>
        </Container>
    );
};


