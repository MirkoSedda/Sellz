
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import StarRating from "react-star-ratings";
import defaultImage from "../../images/product-image-placeholder.jpg"
import ProductListItems from "./ProductListItems";
import RatingModal from "../modal/RatingModal";
import averageStarRating from "../rating/averageStarRating";
import LoginModal from "../modal/LoginModal";
import { toast } from "react-toastify";
import { addToWishlist, getWishlist } from "../../functions/user";
import _ from "lodash";
const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {

    const [show, setShow] = useState(false);
    const [wishListed, setWishlisted] = useState([]);
    const [wish, setWish] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { title, images, description, _id } = product;
    const accessToken = useSelector(state => state.user?.accessToken)
    console.log("🚀 ~ file: SingleProduct.jsx ~ line 31 ~ SingleProduct ~ accessToken", accessToken)

    const dispatch = useDispatch();

    useEffect(() => {
        loadWishlisted()
        // eslint-disable-next-line 
    }, [])

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

    const loadWishlisted = () => {
        getWishlist(accessToken).then((w) =>
            setWishlisted(w.data.wishlist))
        if (wishListed.some((w) => w._id === product._id)) setWish(!wish)
        console.log("🚀 ~ file: SingleProduct.jsx ~ line 72 ~ loadWishlisted ~ wish", wish)
    }

    const handleAddToWishlist = () => {
        if (accessToken) {
            addToWishlist(product._id, accessToken).then((res) => {
                toast.info("Added to wishlist");
            });
        } else {
            handleShow(true)
        }

    };

    return (
        <>
            <Col md={7} className="mt-5">
                <div className="mx-auto " style={{ width: "350px" }}>
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
                                    className="mb-3 rounded card-image"
                                    alt={"default"}
                                />
                            }
                        >
                        </Card>
                    )}
                </div>


                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call me on +393518293944 to learn more about this product,
                        or send me an email at: mirko.sedda1@gmail.com
                    </TabPane>
                </Tabs>
            </Col>

            <Col md={5} className="mt-5">
                <h1 className="p-3 text-center">{title}</h1>

                {product?.ratings?.length > 0 ? (
                    averageStarRating(product)
                ) : (
                    <div className="text-center pt-1 pb-3">No rating yet</div>
                )}

                <Card
                    actions={[
                        <Tooltip title={"Add to cart"}>
                            <div onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-black" />
                                <br />
                                Add to cart
                            </div>
                        </Tooltip>,
                        // TODO fix the wishlist 
                        <Tooltip title={accessToken && !wish ? "Add to wishlist." :
                            accessToken && wish ? "Remove from wishlist." :
                                accessToken ? "Add to wishlist" :
                                    !accessToken ? "Login to wishlist" : null
                        }>
                            <div onClick={handleAddToWishlist}>
                                <HeartOutlined className="text-black" />
                                <br />
                                {accessToken && !wish ? "Add to wishlist." :
                                    accessToken && wish ? "Remove from wishlist." :
                                        accessToken ? "Add to wishlist" :
                                            !accessToken ? "Login to wishlist" : null
                                }
                            </div>
                        </Tooltip >,
                        <Tooltip title={"Leave rating"}>
                            <RatingModal>
                                <StarRating
                                    name={_id}
                                    numberOfStars={5}
                                    rating={star}
                                    changeRating={onStarClick}
                                    isSelectable={true}
                                    starRatedColor="blue"
                                />
                            </RatingModal>
                        </Tooltip>,
                    ]}
                >
                    <LoginModal handleShow={handleShow} handleClose={handleClose} show={show} />
                    <ProductListItems product={product} />
                </Card>
            </Col>
        </>
    );
};

export default SingleProduct;
