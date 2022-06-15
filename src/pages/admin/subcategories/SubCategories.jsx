
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategories } from "../../../functions/categories"
import { newSubCategory, getSubCategories, deleteSubCategory } from "../../../functions/subCategories";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminSidebar from "../../../components/sidebars/AdminSidebar"
import CreateCategoryForm from "../../../components/forms/CreateCategoryForm";
import SearchForm from "../../../components/forms/SearchForm";

const SubCategories = () => {

    const accessToken = useSelector((state) => state.user?.accessToken)

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        loadCategories();
        loadSubCategories();
    }, []);

    const loadCategories = () => getCategories().then(c => setCategories(c.data))

    const loadSubCategories = () => getSubCategories().then(s => setSubCategories(s.data))

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        newSubCategory({ name, parent: category }, accessToken)
            .then(res => {
                setLoading(false)
                setName("")
                toast.success(`"${res.data.name}" is created`)
                loadSubCategories()
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const handleRemove = async (slug) => {
        console.log(accessToken);
        setLoading(true);
        deleteSubCategory(slug, accessToken)
            .then((res) => {
                console.log(res)
                setLoading(false);
                toast.error(`${slug} deleted`);
                loadSubCategories()
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    setLoading(false);
                    toast.error(err.response.data);
                }
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value.toLowerCase());
    }

    const searched = (query) => (q) => q.name.toLowerCase().includes(query);

    return (
        <Container>
            <Row>
                <Col md={2}>
                    <AdminSidebar />
                </Col>
                <Col md={10}>
                    {loading ? (
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h4>Create sub category</h4>
                    )}
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            className=""
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Please select a category</option>
                            {categories.length > 0 &&
                                categories.map((c) => <option key={`category_${c.id}`} value={c._id} >
                                    {c.name}
                                </option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>
                    <CreateCategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />
                    <SearchForm
                        handleSearch={handleSearch}
                        query={query} />
                    {subCategories.filter(searched(query)).map((s) => (
                        <div className="alert alert-secondary" key={`categories-${s._id}`}>
                            {s.name}
                            <span
                                onClick={() => handleRemove(s.slug)}
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/admin/subcategories/${s.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container >
    );
};

export default SubCategories;