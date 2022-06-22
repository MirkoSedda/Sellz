
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import defaultImage from "../../images/product-image-placeholder.jpg"
import { Link } from "react-router-dom";
import averageStarRating from "../rating/averageStarRating";
import _ from "lodash";
const { Meta } = Card;

const ProductCard = ({ product }) => {

    const dispatch = useDispatch();

    const { images, title, description, slug, price } = product;

    const [tooltip, setTooltip] = useState("Click to add");

    const handleAddToCart = () => {
        let cart = [];
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
    };

    return (
        <>
            <div className={"mt-4 mx-auto"}>
                {product?.ratings?.length > 0 ? (
                    averageStarRating(product)
                ) : (
                    <div className="text-center pt-1 pb-3">No rating yet</div>
                )}
            </div>
            <div className={"d-flex justify-content-center"}>
                <Card style={{ width: "250px" }}
                    cover={
                        <img
                            src={images?.length ? images[0].url : defaultImage}
                            alt={`${title}`}
                            style={{ height: "230px", objectFit: "cover" }}
                            className="p-1"
                        />
                    }
                    actions={[
                        <Link to={`/product/${slug}`}>
                            <EyeOutlined className="text-dark" />
                            <br /> View Product
                        </Link>,
                        <Tooltip title={product.quantity > 1 ? "Add to cart" : "Sorry we are out of stock :()"}>
                            <div onClick={product.quantity > 1 && handleAddToCart} disabled={product.quantity < 1}>
                                <ShoppingCartOutlined className="text-dark" /> <br />
                                {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
                            </div>
                        </Tooltip>,
                    ]}
                >

                    <Meta
                        title={`${title} - €${price}`}
                        description={`${description?.substring(0, 40)}...`}
                    />
                </Card >
            </div>
        </>
    );
};

export default ProductCard