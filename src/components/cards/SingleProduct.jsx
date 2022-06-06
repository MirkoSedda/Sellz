import React from "react";
import Col from "react-bootstrap/Col";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultImage from "../../images/product-image-placeholder.jpg"
import { ProductListItems } from "./ProductListItems";
const { TabPane } = Tabs;

export const SingleProduct = ({ product }) => {
    const { title, images, description } = product;

    return (
        <>
            <Col md={7} className="">
                {images && images.length ? (
                    <Carousel
                        showArrows={true}
                        autoPlay
                        infiniteLoop
                    >
                        {
                            images && images.map((i) =>
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
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success" /> <br />
                            Add to Cart
                        </>,
                        <Link to="/">
                            <HeartOutlined className="text-info" /> <br /> Add to Wishlist
                        </Link>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </Col>
        </>
    );
};


