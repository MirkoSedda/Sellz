
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../../../components/sidebars/AdminSidebar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProduct, updateProduct } from "../../../functions/products";
import { getCategories, getSubCategoriesBasedOnCategory } from "../../../functions/categories";
import { FileUpload } from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { UpdateProductForm } from "../../../components/forms/UpdateProductForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subCategories: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "White", "Red", "Blue", "Green"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

export const UpdateProduct = () => {

  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [arrayOfSubCategories, setArrayOfSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const accessToken = useSelector(state => state.userReducer?.accessToken)
  const navigate = useNavigate()
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    loadProduct();
    loadCategories();
    // eslint-disable-next-line 
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // console.log("single product", p);
      // 1 load single product
      setValues({ ...values, ...p.data });
      // 2 load single product category subs
      getSubCategoriesBasedOnCategory(p.data.category._id).then((res) => {
        setSubCategoryOptions(res.data); // on first load, show default subs
      });
      // 3 prepare array of sub ids to show as default sub values in antd Select
      let arr = [];
      p.data.subs && p.data.subs.map((s) => arr.push(s._id));
      console.log("ARR", arr);
      setSubCategoryOptions((prev) => arr); // required for ant design select to work
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('click');
    values.subs = arrayOfSubCategories;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, accessToken)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        navigate("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getSubCategoriesBasedOnCategory(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubCategoryOptions(res.data);
    });

    console.log("EXISTING CATEGORY values.category", values.category);

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    // clear old sub category ids
    setArrayOfSubCategories([]);
  };

  return (
    <Container>
      <Row>
        <Col md={2}>
          <AdminSidebar />
        </Col>

        <Col md={10}>
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <>
              <h4>Product update</h4>
              {/* {JSON.stringify(values)} */}

              <div className="p-3">
                <FileUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                />
              </div>

              <UpdateProductForm
                values={values}
                categories={categories}
                selectedCategory={selectedCategory}
                subCategoryOptions={subCategoryOptions}
                arrayOfSubCategories={arrayOfSubCategories}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setValues={setValues}
                handleCategoryChange={handleCategoryChange}
                setArrayOfSubCategories={setArrayOfSubCategories}
              />
            </>
          )}
          <hr />
        </Col>
      </Row>
    </Container>
  );
};