
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StarRating from "react-star-ratings";
import defaultImage from "../../images/product-image-placeholder.jpg"
import { ProductListItems } from "./ProductListItems";
import { RatingModal } from "../modal/RatingModal";
import { averageStarRating } from "../rating/averageStarRating";
import _ from "lodash";
const { TabPane } = Tabs;


export const SingleProduct = ({ product, onStarClick, star }) => {

    const { title, images, description, _id } = product;

    const [tooltip, setTooltip] = useState("Click to add");

    const dispatch = useDispatch();
    const { cart } = useSelector((state) => ({ ...state }));
    const { user } = useSelector(state => state.user)

    const handleAddToCart = () => {
        let cart = [];
        // useful check for future nextJS version if SSR
        if (typeof window !== "undefined") {
            // if cart is in local storage GET it
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            console.log('unique', unique)
            localStorage.setItem("cart", JSON.stringify(unique));
            // show tooltip
            setTooltip("Added");
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            // show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };

    return (
        <>
            <Col md={7} className="">
                {images?.length ? (
                    <Carousel
                        showArrows={true}
                        autoPlay
                        infiniteLoop
                    >
                        {
                            images?.map((i) =>
                                <img
                                    src={i.url}
                                    key={i.public_id}
                                    alt={i.public_id}
                                />)
                        }
                    </Carousel>
                ) : (
                    <Card cover=
                        {
                            <img
                                src={defaultImage}
                                className="mb-3 card-image"
                                alt={"default"}
                            />
                        }
                    >
                    </Card>
                )}

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call use on xxxx xxx xxx to learn more about this product.
                    </TabPane>
                </Tabs>
            </Col>

            <Col md={5} className="">
                <h1 className="bg-info p-3">{title}</h1>

                {product?.ratings?.length > 0 ? (
                    averageStarRating(product)
                ) : (
                    <div className="text-center pt-1 pb-3">No rating yet</div>
                )}

                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <div onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                                Cart
                            </div>
                        </Tooltip>,
                        <Link to="/">
                            <HeartOutlined className="text-info" /> <br /> Add to Wishlist
                        </Link>,
                        <RatingModal>
                            <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </Col>
        </>
    );
};


