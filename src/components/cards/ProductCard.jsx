import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import defaultImage from "../../images/product-image-placeholder.jpg"
import { Link } from "react-router-dom";
import { averageStarRating } from "../rating/averageStarRating";

const { Meta } = Card;

export const ProductCard = ({ product }) => {
    const { images, title, description, slug } = product;
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
                    <>
                        <ShoppingCartOutlined className="text-danger" />
                        <br /> Add to Cart
                    </>,
                ]}
            >
                <Meta
                    title={title}
                    description={`${description?.substring(0, 40)}...`}
                />
            </Card>
        </>
    );
};


