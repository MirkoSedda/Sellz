import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UserSidebar } from "../../components/sidebars/UserSidebar";

export const History = () => (
    <Container>
        <Row>
            <Col md={2}>
                <UserSidebar />
            </Col>
            <Col md={10}>
                user history page
            </Col>
        </Row>
    </Container>
);