import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { AddressForm } from "../../components/forms/AddressForm";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon } from "../../functions/user";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState("DEMODAY20");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountError, setDiscountError] = useState("");

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { accessToken } = useSelector(state => state.user)

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

    const applyDiscountCoupon = () => {
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
                console.log("🚀 ~ file: Checkout.jsx ~ line 82 ~ applyCoupon ~ res.data", res.status)
                setDiscountError(res.data);
                // update redux coupon applied true/false
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: false,
                });
            }
        });
    };

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
            <Button onClick={applyDiscountCoupon} className="btn-primary mt-2">
                Apply
            </Button>
        </>
    );

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
                    {products?.map((p, i) => (
                        <div key={i}>
                            <p>
                                {p.product.title} ({p.color}) x {p.count} ={" "}
                                {p.product.price * p.count}
                            </p>
                        </div>
                    ))}
                    <hr />
                    <p>Cart Total: {total}</p>

                    {totalAfterDiscount > 0 && (
                        <p className="bg-success p-2">
                            Discount Applied: Total Payable: ${totalAfterDiscount}
                        </p>
                    )}

                    <Button
                        className="btn-primary my-3 me-5"
                        disabled={!addressSaved || !products?.length}
                        onClick={() => navigate("/payment")}
                    >
                        Place Order
                    </Button>
                    <Button
                        disabled={!products?.length}
                        onClick={emptyCart}
                        className="btn-primary"
                    >
                        Empty Cart
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}


