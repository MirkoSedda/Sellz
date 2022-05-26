
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategories } from "../../../utils/categoriesFetch"
import { newSubCategory, getSubCategories, getSubCategory, deleteSubCategory } from "../../../utils/subCategoriesFetch";
import { AdminSidebar } from "../../../components/AdminSidebar"
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CategoryForm } from "../../../components/Forms/CategoryForm";
import { SearchForm } from "../../../components/Forms/SearchForm";
import { FormGroup } from "react-bootstrap"

export const SubCategories = () => {

    const accessToken = useSelector((state) => state.userReducer?.accessToken)

    const [name, nameSetter] = useState("");
    const [loading, loadingSetter] = useState(false);
    const [categories, categoriesSetter] = useState([]);
    const [category, categorySetter] = useState("");
    const [subCategories, subCategoriesSetter] = useState([]);
    const [query, querySetter] = useState("");

    useEffect(() => {
        loadCategories();
        loadSubCategories();
    }, []);

    const loadCategories = () => getCategories().then(c => categoriesSetter(c.data))

    const loadSubCategories = () => getSubCategories().then(s => subCategoriesSetter(s.data))

    const handleSubmit = e => {
        e.preventDefault()
        loadingSetter(true)
        newSubCategory({ name, parent: category }, accessToken)
            .then(res => {
                loadingSetter(false)
                nameSetter("")
                toast.success(`"${res.data.name}" is created`)
                loadSubCategories()
            })
            .catch(err => {
                console.log(err)
                loadingSetter(false)
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const handleRemove = async (slug) => {
        console.log(accessToken);
        loadingSetter(true);
        deleteSubCategory(slug, accessToken)
            .then((res) => {
                console.log(res)
                loadingSetter(false);
                toast.error(`${slug} deleted`);
                loadSubCategories()
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
                        <h4>Create sub category</h4>
                    )}
                    <FormGroup>
                        <label>Category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => categorySetter(e.target.value)}
                        >
                            <option>Please select a category</option>
                            {categories.length > 0 &&
                                categories.map((c) => <option key={`category_${c.id}`} value={c._id} >
                                    {c.name}
                                </option>
                                )
                            }
                        </select>
                    </FormGroup>
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        nameSetter={nameSetter} />
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
                </div>
            </div>
        </div >
    );
};
