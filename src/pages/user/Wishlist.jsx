
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UserSidebar } from "../../components/UserSidebar";

export const Wishlist = () => (
    <Container>
        <Row>
            <Col md={2}>
                <UserSidebar />
            </Col>
            <Col md={10} className="">
                user wishlist page
            </Col>
        </Row>
    </Container>
);