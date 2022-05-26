import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { newCategory, getCategories, deleteCategory } from "../../../utils/categoriesFetch";
import { AdminSidebar } from "../../../components/AdminSidebar"
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CategoryForm } from "../../../components/Forms/CategoryForm";
import { SearchForm } from "../../../components/Forms/SearchForm";

export const Categories = () => {

    const accessToken = useSelector((state) => state.userReducer?.accessToken)

    const [name, nameSetter] = useState("");
    const [loading, loadingSetter] = useState(false);
    const [categories, categoriesSetter] = useState([]);
    const [query, querySetter] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => categoriesSetter(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(accessToken);
        loadingSetter(true);
        newCategory({ name }, accessToken)
            .then((res) => {
                console.log(res.data)
                loadingSetter(false);
                nameSetter("");
                toast.success(`${res.data.name} is created`);
                loadCategories();
            })
            .catch((err) => {
                console.log(err);
                loadingSetter(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (slug) => {
        console.log(accessToken);
        loadingSetter(true);
        deleteCategory(slug, accessToken)
            .then((res) => {
                console.log(res)
                loadingSetter(false);
                toast.error(`${slug} deleted`);
                loadCategories();
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    loadingSetter(false);
                    toast.error(err.response.data);
                }
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        querySetter(e.target.value.toLowerCase());
    }

    const searched = (query) => (q) => q.name.toLowerCase().includes(query);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminSidebar />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h4>Create category</h4>
                    )}

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        nameSetter={nameSetter} />
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
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/admin/categories/${c.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
