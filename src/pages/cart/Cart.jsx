import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductCardForCart } from "../../components/cards/ProductCardForCart";

export const Cart = () => {
  const { cart } = useSelector((state) => ({ ...state }));
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch();

  const getTotal = () => (cart.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.count * nextValue.price;
  }, 0))

  const saveOrderInDb = () => {
    //
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
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
              onClick={saveOrderInDb}
              className="btn btn-sm btn-primary mt-2"
              disabled={!cart.length}
            >
              Proceed to Checkout
            </button>
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
