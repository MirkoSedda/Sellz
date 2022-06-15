import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { AddressForm } from "../../components/forms/AddressForm";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon, createCashOrder } from "../../functions/user";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [setLoading] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState("DEMODAY20");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [setDiscountError] = useState("");

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { accessToken } = useSelector(state => state.user)
    const { cashOnDelivery } = useSelector((state) => state);
    console.log("🚀 ~ file: Checkout.jsx ~ line 26 ~ Checkout ~ cashOnDelivery", cashOnDelivery)
    const validCoupon = useSelector((state) => state.coupon);
    console.log("🚀 ~ file: Checkout.jsx ~ line 28 ~ Checkout ~ validCoupon", validCoupon)


    useEffect(() => {
        getUserCart(accessToken).then((res) => {
            console.log("products in the cart in the database", JSON.stringify(res.data, null, 4));
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
            console.log("🚀 ~ file: Checkout.jsx ~ line 32 ~ getUserCart ~ res.data.cartTotal", res.data.cartTotal)
        });
        // eslint-disable-next-line
    }, []);

    const emptyCart = () => {
        localStorage.removeItem("cart");

        // remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });
        // remove from database
        emptyUserCart(accessToken).then((res) => {
            setProducts([]);
            setTotal(0);
            setTotalAfterDiscount(0);
            setCoupon("");
            toast.success("Cart is empty. Continue shopping.");
        });
    };

    const saveAddressInDb = () => {
        console.log(address);
        saveUserAddress(address, accessToken,).then((res) => {
            if (res.data.address) {
                setAddressSaved(true);
                // console.log("🚀 ~ file: Checkout.jsx ~ line 59 ~ saveUserAddress ~ res.data", res.data.address)
                toast.success("Address saved");
            }
        });
    };

    const applyCouponToCart = () => {
        console.log("coupon sent to backend", coupon);
        applyCoupon(coupon, accessToken).then((res) => {
            console.log("COUPON APPLIED", res.data);
            if (res.data) {
                setTotalAfterDiscount(res.data.totalAfterDiscount);
                // update redux coupon applied true/false
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: true,
                });
            }
            if (res.data.err) {
                console.log("🚀 ~ file: Checkout.jsx ~ line 82 ~ applyCoupon ~ res.data", res.data)
                setDiscountError(res.data);
                // update redux coupon applied true/false
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: false,
                });
            }
        });
    };

    const showProductSummary = () =>
        products.map((p, i) => (
            <div key={i}>
                <p>
                    {p.product.title} ({p.color}) x {p.count} ={" "}
                    {p.product.price * p.count}
                </p>
            </div>
        ));

    const showApplyCoupon = () => (
        <>
            <Form>
                <Form.Control
                    onChange={(e) => {
                        setCoupon(e.target.value);
                        setDiscountError("");
                    }}
                    value={coupon}
                    type="text"
                    className=""
                />
            </Form>
            <Button onClick={applyCouponToCart} className="btn-primary my-4">
                Apply
            </Button>
        </>
    );

    const cashOrder = () => {
        createCashOrder(accessToken, cashOnDelivery, validCoupon).then((res) => {
            console.log("🚀 ~ file: Checkout.jsx ~ line 123 ~ createCashOrder ~ res", res)
            if (res.data) {
                setLoading(true);
                // empty local storage
                localStorage.removeItem("cart");
                // empty redux cart
                dispatch({
                    type: "ADD_TO_CART",
                    payload: [],
                });
                // empty redux coupon
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: false,
                });
                // empty redux cashOnDelivery
                dispatch({
                    type: "CASH_ON_DELIVERY",
                    payload: false,
                });
                // empty cart from backend
                emptyUserCart(accessToken).then((res) => {
                    console.log("🚀 ~ file: Checkout.jsx ~ line 148 ~ emptyUserCart ~ res", res)
                    res.data && (
                        setTimeout(() => {
                            navigate("/user/history");
                        }, 2000))
                    toast.success("Cash order placed successfully");
                });

            }
        });
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col md={6} className="">
                    <h4>Delivery Address</h4>
                    <br />
                    <br />
                    <AddressForm
                        saveAddressInDb={saveAddressInDb}
                        setAddress={setAddress}
                        address={address}
                    />
                    <hr />
                    <h4>Got Coupon?</h4>
                    <br />
                    {showApplyCoupon()}
                    <br />
                    {/* TODO show a proper error message if coupon not valid */}
                </Col>

                <Col md={6} className="">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products {products?.length}</p>
                    <hr />
                    {showProductSummary()}
                    <hr />
                    <p>Cart Total: €{total}</p>

                    {totalAfterDiscount > 0 && (
                        <p className="bg-success p-2">
                            Discount Applied: Total Payable: {totalAfterDiscount}
                        </p>
                    )}
                    <Row>
                        <div className="d-flex flex-row ">
                            <Col md={6} className="me-5">
                                {cashOnDelivery ? (
                                    <Button
                                        className="btn-primary"
                                        disabled={!addressSaved || !products.length}
                                        onClick={cashOrder}
                                    >
                                        Cash Order
                                    </Button>
                                ) : (
                                    <Button
                                        className="btn-primary"
                                        disabled={!addressSaved || !products.length}
                                        onClick={() => navigate("/payment")}
                                    >
                                        Place Order
                                    </Button>
                                )}
                            </Col>
                            <Col md={6} className="">
                                <Button
                                    disabled={!products.length}
                                    onClick={emptyCart}
                                    className="btn-primary"
                                >
                                    Empty Cart
                                </Button>
                            </Col>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Checkout;
