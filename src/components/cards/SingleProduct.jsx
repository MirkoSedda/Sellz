
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StarRating from "react-star-ratings";
import defaultImage from "../../images/product-image-placeholder.jpg"
import { ProductListItems } from "./ProductListItems";
import { RatingModal } from "../modal/RatingModal";
import { averageStarRating } from "../rating/averageStarRating";
import { toast } from "react-toastify";
import { addToWishlist } from "../../functions/user";
import _ from "lodash";
const { TabPane } = Tabs;

//TODO check for logged in user before adding to wishlist

export const SingleProduct = ({ product, onStarClick, star }) => {

    const { title, images, description, _id } = product;

    const accessToken = useSelector(state => state.user?.accessToken)

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleAddToWishlist = () => {
        if (accessToken) {
            console.log("🚀 ~ file: SingleProduct.jsx ~ line 60 ~ addToWishlist ~ accessToken", accessToken)
            addToWishlist(product._id, accessToken).then((res) => {
                console.log("🚀 ~ file: SingleProduct.jsx ~ line 68 ~ addToWishlist ~ addedToWishlist", res.data)
                toast.success("Added to wishlist");
            });
        } else {
            //  TODO implement modal for login 
            navigate("/login")
        }

    };

    const handleModal = () => {

    }
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
                        Call me on +393518293944 to learn more about this product,
                        or send me an email at: mirko.sedda1@gmail.com
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
                        <Tooltip title={"Add to cart"}>
                            <div onClick={handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger" />
                                <br />
                                Add to cart
                            </div>
                        </Tooltip>,
                        <Tooltip title={accessToken ? "Add to wishlist" : "Please login to add to wishlist."}>
                            <div onClick={handleAddToWishlist}>
                                <HeartOutlined className="text-info" />
                                <br />
                                {accessToken ? "Add to wishlist" : "Login to add to wishlist."}                            </div>
                        </Tooltip >,
                        <Tooltip title={"Leave rating"}>
                            <RatingModal>
                                <StarRating
                                    name={_id}
                                    numberOfStars={5}
                                    rating={star}
                                    changeRating={onStarClick}
                                    isSelectable={true}
                                    starRatedColor="red"
                                />
                            </RatingModal>
                        </Tooltip>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </Col>
        </>
    );
};


