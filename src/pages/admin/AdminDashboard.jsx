
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from 'react';
import { AdminSidebar } from "../../components/sidebars/AdminSidebar"
import { getProductsByCount } from "../../functions/products"

export const AdminDashboard = () => {



    return (
        <Container>
            <Row>
                <Col md={2}>
                    <AdminSidebar />
                </Col>
                <Col md={10}>
                    <h4>admin dashboard</h4>
                </Col>
            </Row>
        </Container>
    )
}
