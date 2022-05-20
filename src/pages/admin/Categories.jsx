import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { newCategory, getCategories, deleteCategory } from "../../utils/categoriesFetch";
import { AdminSidebar } from "../../components/AdminSidebar"
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const Categories = () => {

    const accessToken = localStorage.getItem("accessToken");
    const [name, nameSetter] = useState("");
    const [loading, loadingSetter] = useState(false);
    const [categories, categoriesSetter] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => categoriesSetter(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        loadingSetter(true);
        newCategory({ name }, accessToken)
            .then((res) => {
                console.log(res)
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
        if (window.confirm("Delete?")) {
            loadingSetter(true);
            deleteCategory(slug, accessToken)
                .then((res) => {
                    loadingSetter(false);
                    toast.error(`${res.data.name} deleted`);
                    loadCategories();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        loadingSetter(false);
                        toast.error(err.response.data);
                    }
                });
        }
    };

    const categoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => nameSetter(e.target.value)}
                    value={name}
                    autoFocus
                    required
                />
                <br />
                <button className="btn btn-outline-primary">Save</button>
            </div>
        </form>
    );

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
                    {categoryForm()}
                    <hr />
                    {categories.map((c) => (
                        <div className="alert alert-secondary" key={c._id}>
                            {c.name}
                            <span
                                onClick={() => handleRemove(c.slug)}
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/admin/category/${c.slug}`}>
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
