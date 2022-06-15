import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_KEY } from "../../costants"
import { Elements } from "@stripe/react-stripe-js";
import { StripeCheckout } from "../../components/stripe/StripeCheckout";
import "./stripe.css";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(STRIPE_KEY);

const Payment = () => {
  return (
    <Container className="container p-5 text-center">
      <Row>
        <h4>Complete your purchase</h4>
        <Elements stripe={promise}>
          <Col md={8} className="col-md-8 offset-md-2">
            <StripeCheckout />
          </Col>
        </Elements>
      </Row >
    </Container>
  );
};

export default Payment;