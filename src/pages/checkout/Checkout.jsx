import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { AddressForm } from "../../components/forms/AddressForm";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress } from "../../functions/user";

//TODO fix the rendering problem...products are undefined god knows why

export const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);

    const dispatch = useDispatch();
    const { accessToken } = useSelector(state => state.user)
    const userId = useSelector(state => state.user.user._id)
    console.log("🚀 ~ file: Checkout.jsx ~ line 22 ~ Checkout ~ userId", userId)

    useEffect(() => {
        cart(userId, accessToken)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cart = async (userId, accessToken) => {
        const res = await getUserCart(userId, accessToken)
        console.log("🚀 ~ file: Checkout.jsx ~ line 38 ~ cart ~ res", res)
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
    }

    const emptyCart = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
        }
        // remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });
        // remove from backend
        emptyUserCart(userId, accessToken).then((res) => {
            setProducts([]);
            setTotal(0);
            toast.success("Cart is empty. Continue shopping.");
        });
    };

    const saveAddressInDb = () => {
        console.log(address);
        saveUserAddress(address, accessToken,).then((res) => {
            if (res.data.ok) {
                setAddressSaved(true);
                toast.success("Address saved");
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
                    coupon input and apply button
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

                    <div className="d-flex flex-row ">
                        <div className="me-5">
                            <button
                                className="btn btn-primary"
                                disabled={!addressSaved || !products?.length}
                            >
                                Place Order
                            </button>
                        </div>

                        <div className="">
                            <button
                                disabled={!products?.length}
                                onClick={emptyCart}
                                className="btn btn-primary"
                            >
                                Empty Cart
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}





