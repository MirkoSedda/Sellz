
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { newCategory, getCategories, deleteCategory } from "../../../functions/categories";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminSidebar from "../../../components/sidebars/AdminSidebar"
import CreateCategoryForm from "../../../components/forms/CreateCategoryForm";
import SearchForm from "../../../components/forms/SearchForm";

const Categories = () => {

    const accessToken = useSelector((state) => state.user?.accessToken)

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("clicked")
        setLoading(true);
        newCategory({ name }, accessToken)
            .then((res) => {
                console.log(res.data)
                setLoading(false);
                setName("");
                toast.info(`${res.data.name} is created`);
                loadCategories();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (slug) => {
        console.log(accessToken);
        setLoading(true);
        deleteCategory(slug, accessToken)
            .then((res) => {
                console.log(res)
                setLoading(false);
                toast.error(`${slug} deleted`);
                loadCategories();
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
                        <h4 className="text-black">Loading..</h4>
                    ) : (
                        <h4>Create category</h4>
                    )}

                    <CreateCategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />
                    <SearchForm
                        handleSearch={handleSearch}
                        query={query} />
                    {categories.filter(searched(query)).map((c) => (
                        <div className="alert alert-secondary" key={c._id}>
                            {c.name}
                            <span
                                onClick={() => handleRemove(c.slug)}
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-black" />
                            </span>
                            <Link to={`/admin/categories/${c.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default Categories;