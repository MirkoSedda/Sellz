
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { newProduct } from "../../../functions/products"
import { getSubCategoriesBasedOnCategory } from "../../../functions/categories"
import { getCategories } from "../../../functions/categories";
import AdminSidebar from "../../../components/sidebars/AdminSidebar"
import CreateProductForm from "../../../components/forms/CreateProductForm"
import FileUpload from "../../../components/forms/FileUpload"

const CreateProduct = () => {

  const accessToken = useSelector(state => state.user?.accessToken)

  const navigate = useNavigate()

  const [values, setValues] = useState({
    title: "demo product",
    description: "demo day product",
    price: "999",
    categories: [],
    category: "",
    subCategories: [],
    shipping: "",
    quantity: "100",
    images: [],
    colors: ["Black", "Silver", "Gold", "White", "Red", "Blue", "Green"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    color: "",
    brand: "",
  })
  const [subCategoryOption, setSubCategoryOption] = useState([])
  const [showSubCategories, setShowSubCategories] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line 
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    newProduct(values, accessToken)
      .then(res => {
        setLoading(false)
        toast.info(`${res.data.title} created successfully`)
        navigate("/admin/products")
      })
      .catch(err => {
        setLoading(false)
        toast.error("Something went wrong")
        //not working - err.data is undefined :(
        //toast.error(err.response.data)
      })
  }

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = e => {
    e.preventDefault()
    setValues({ ...values, category: e.target.value, subCategories: [] })
    getSubCategoriesBasedOnCategory(e.target.value).then(res => {
      setSubCategoryOption(res.data)
    })
    setShowSubCategories(true)
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={2}>
          <AdminSidebar />
        </Col>

        <Col>
          <h4 className="text-center mb-5">Create product</h4>

          {loading ? (
            <>
              <h4> Loading image...</h4>
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </>
          ) :
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          }

          <CreateProductForm
            values={values}
            subCategoryOption={subCategoryOption}
            showSubCategories={showSubCategories}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
          />
        </Col>
      </Row>
    </Container >
  )
}

export default CreateProduct