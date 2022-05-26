
import { AdminSidebar } from "../../../components/AdminSidebar";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCategory, updateCategory } from "../../../utils/categoriesFetch";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { CategoryForm } from "../../../components/Forms/CategoryForm";

export const UpdateCategory = () => {
    const params = useParams();
    const { slug } = params
    const navigate = useNavigate();

    const [name, nameSetter] = useState(slug);
    const [loading, setLoading] = useState(false);

    const accessToken = useSelector((state) => state.userReducer?.accessToken);

    const handleSubmit = async (e) => {
        console.log(accessToken);
        e.preventDefault();
        setLoading(true);
        updateCategory(slug, { name }, accessToken)
            .then((res) => {
                setLoading(false);
                nameSetter("");
                toast.success(`"${res.data.name}" is updated !`);
                navigate("/admin/categories");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    return (
        <Container>
            <Row>
                <Col md={2} className="d-none d-md-block">
                    <AdminSidebar />
                </Col>
                <Col md={10}>
                    <CategoryForm handleSubmit={handleSubmit} name={name} nameSetter={nameSetter} />
                </Col>
            </Row>
        </Container>
    );
};