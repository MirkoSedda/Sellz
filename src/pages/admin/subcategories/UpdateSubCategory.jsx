import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../utils/categoriesFetch"
import { getSubCategories, updateSubCategory } from "../../../utils/subCategoriesFetch"
import { CategoryForm } from "../../../components/Forms/CategoryForm";
import { useParams, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../../../components/AdminSidebar";

export const UpdateSubCategory = () => {
    const params = useParams()
    const { slug } = params
    const navigate = useNavigate();
    const [name, nameSetter] = useState("");
    const [loading, loadingSetter] = useState(false);
    const [categories, categoriesSetter] = useState([]);
    const [parent, parentSetter] = useState("");

    const accessToken = useSelector((state) => state.userReducer?.accessToken);

    useEffect(() => {
        loadCategories();
        loadSubCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => categoriesSetter(c.data));

    const loadSubCategories = () =>
        getSubCategories(slug).then((s) => {
            nameSetter(s.data.name);
            parentSetter(s.data.parent);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        loadingSetter(true);
        updateSubCategory(slug, { name, parent }, accessToken)
            .then((res) => {
                console.log(slug, name, parent, accessToken);
                loadingSetter(false);
                nameSetter("");
                toast.success(`"${res.data.name}" is updated`);
                navigate("/admin/subcategories");
            })
            .catch((err) => {
                console.log(err);
                loadingSetter(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };
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
                        <h4>Update sub category</h4>
                    )}

                    <div className="form-group">
                        <label>Parent category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => parentSetter(e.target.value)}
                        >
                            <option>Please select</option>
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <option key={c._id} value={c._id} selected={c._id === parent}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {/* <form onSubmit={handleSubmit}>
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
                            <hr />
                        </div>
                    </form> */}
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        nameSetter={nameSetter}
                    />
                </div>
            </div>
        </div>
    );
};
