import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPaymentIntent } from "../../functions/stripe";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { toast } from "react-toastify";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import defaultImage from "../../images/product-image-placeholder.jpg"
import { createOrder, emptyUserCart } from "../../functions/user";

const StripeCheckout = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state?.coupon);
  const accessToken = useSelector(state => state.user?.accessToken)

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(accessToken, coupon).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);
      // additional response received on successful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      createOrder(payload, accessToken).then((res) => {
        if (res.data) {
          // empty cart from local storage
          localStorage.removeItem("cart");
          // empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          // empty cart from database
          emptyUserCart(accessToken);
        }
      });
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      toast.info("Payment successful");
      setTimeout(() => {
        navigate("/user/history")
      }, 2000)
    }
  };

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the customer types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: €${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={defaultImage}
              alt={"product"}
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: €
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable : €
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.{" "}
          <Link to="/user/history">See it in your purchase history.</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;