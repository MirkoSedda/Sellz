
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import defaultImage from "../../images/product-image-placeholder.jpg"
import { Link } from "react-router-dom";
import { averageStarRating } from "../rating/averageStarRating";
import _ from "lodash";
const { Meta } = Card;

export const ProductCard = ({ product }) => {

    const dispatch = useDispatch();

    const { images, title, description, slug, price } = product;

    const [tooltip, setTooltip] = useState("Click to add");

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
            {product?.ratings?.length > 0 ? (
                averageStarRating(product)
            ) : (
                <div className="text-center pt-1 pb-3">No rating yet</div>
            )}
            <Card
                cover={
                    <img
                        src={images?.length ? images[0].url : defaultImage}
                        alt={`${title}`}
                        style={{ height: "150px", objectFit: "cover" }}
                        className="p-1"
                    />
                }
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" />
                        <br /> View Product
                    </Link>,
                    <Tooltip title={product.quantity > 1 ? "Add to cart" : "Sorry we are out of stock :()"}>
                        <div onClick={product.quantity > 1 && handleAddToCart} disabled={product.quantity < 1}>
                            <ShoppingCartOutlined className="text-danger" /> <br />
                            {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
                        </div>
                    </Tooltip>,
                ]}
            >
                <Meta
                    title={`${title} - $${price}`}
                    description={`${description?.substring(0, 40)}...`}
                />
            </Card >
        </>
    );
};


