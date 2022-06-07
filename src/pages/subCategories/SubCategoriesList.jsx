import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { getSubCategory } from "../../functions/subCategories"
import { ProductCard } from "../../components/cards/ProductCard"

export const SubCategoriesList = () => {
  const [subCategory, setSubCategory] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { slug } = params

  useEffect(() => {
    setLoading(true)
    getSubCategory(slug).then(res => {
      console.log(JSON.stringify(res.data, null, 4))
      setSubCategory(res.data.subCategory)
      setProducts(res.data.products)
      setLoading(false)
    })
    // eslint-disable-next-line 
  }, [])

  return (
    <Container className="">
      <Row className="">
        <Col className="">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products?.length} Products in "{subCategory?.name}" sub category
            </h4>
          )}
        </Col>
      </Row>

      <Col className="">
        {products?.map(p => (
          <Col className="" key={p._id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Col>
    </Container>
  )
}


