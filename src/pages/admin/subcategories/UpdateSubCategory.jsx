
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/categories"
import { getSubCategories, updateSubCategory } from "../../../functions/subCategories"
import { useParams, useNavigate } from "react-router-dom";
import CreateCategoryForm from "../../../components/forms/CreateCategoryForm";
import AdminSidebar from "../../../components/sidebars/AdminSidebar";

const UpdateSubCategory = () => {
    const params = useParams()
    const { slug } = params
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState("");

    const accessToken = useSelector((state) => state.user?.accessToken);

    useEffect(() => {
        loadCategories();
        loadSubCategories();
        // eslint-disable-next-line
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubCategories = () =>
        getSubCategories(slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSubCategory(slug, { name, parent }, accessToken)
            .then((res) => {
                console.log(slug, name, parent, accessToken);
                setLoading(false);
                setName("");
                toast.info(`"${res.data.name}" is updated`);
                navigate("/admin/subcategories");
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
                <Col md={2}>
                    <AdminSidebar />
                </Col>
                <Col md={10}>
                    {loading ? (
                        <h4 className="text-black">Loading..</h4>
                    ) : (
                        <h4>Update sub category</h4>
                    )}
                    <Form>
                        <Form.Group>
                            <Form.Label>Parent category</Form.Label>
                            <Form.Select
                                name="category"
                                className="form-control"
                                onChange={(e) => setParent(e.target.value)}
                            >
                                <option>Please select</option>
                                {categories.length > 0 &&
                                    categories.map((c) => (
                                        <option key={c._id} value={c._id} selected={c._id === parent}>
                                            {c.name}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    <CreateCategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateSubCategory;