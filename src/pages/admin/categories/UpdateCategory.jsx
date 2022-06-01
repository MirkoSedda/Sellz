
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AdminSidebar } from "../../../components/AdminSidebar";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCategory, updateCategory } from "../../../functions/categories";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { CreateCategoryForm } from "../../../components/forms/CreateCategoryForm";

export const UpdateCategory = () => {
    const params = useParams();
    const { slug } = params
    const navigate = useNavigate();

    const [name, setName] = useState(slug);
    const [loading, setLoading] = useState(false);

    const accessToken = useSelector((state) => state.userReducer?.accessToken);

    const handleSubmit = async (e) => {
        console.log(accessToken);
        e.preventDefault();
        setLoading(true);
        updateCategory(slug, { name }, accessToken)
            .then((res) => {
                setLoading(false);
                setName("");
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
                    <CreateCategoryForm
                        name={name}
                        handleSubmit={handleSubmit}
                        setName={setName} />
                </Col>
            </Row>
        </Container>
    );
};