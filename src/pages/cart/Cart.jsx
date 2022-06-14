
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProductCardForCart } from "../../components/cards/ProductCardForCart";
import { userCart } from "../../functions/user"

export const Cart = () => {

  const { cart } = useSelector((state) => ({ ...state }));
  const accessToken = useSelector(state => state.user?.accessToken)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)

  const getTotal = () => (cart.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.count * nextValue.price;
  }, 0))

  useEffect(() => {
    saveOrderInDb()
    // eslint-disable-next-line 
  }, [cart])


  const saveOrderInDb = () => {
    console.log("cart", JSON.stringify(cart, null, 2));
    setLoading(true)
    userCart(cart, accessToken)
      .then((res) => {
        console.log("🚀 ~ file: Cart.jsx ~ line 28 ~ .then ~ res.data", res.data)
        res.data && setLoading(false)
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    console.log("cart", JSON.stringify(cart, null, 2));
    dispatch({
      type: "CASH_ON_DELIVERY",
      payload: true,
    });
    userCart(cart, accessToken)
      .then((res) => {
        console.log("🚀 ~ file: Cart.jsx ~ line 50 ~ .then ~ res", res)
        if (res.data) navigate("/checkout");
      })
      .catch((err) => console.log("cart save error", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardForCart key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <Container className="pt-2">
      <Row className="">
        <Col md={8} className="">
          <h4>Cart ~ {cart.length} Product{cart.length > 1 && "s"}</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </Col>
        <Col md={4} className="">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = €{c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>€{getTotal()}</b>
          <hr />
          {accessToken && !loading ? (
            <>
              <button
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>

          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              {/* TODO implement modal for login */}
              <Link
                to="/login"
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </Col>
      </Row>
    </Container>
  );
};
