import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { toast } from "react-toastify"
import DatePicker from "react-datepicker"
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon"
import "react-datepicker/dist/react-datepicker.css"
import { DeleteOutlined } from "@ant-design/icons"
import AdminSidebar from "../../../components/sidebars/AdminSidebar"

const CreateCouponPage = () => {
  const [name, setName] = useState("DEMODAY")
  const [expiry, setExpiry] = useState("")
  const [discount, setDiscount] = useState("50")
  const [loading, setLoading] = useState("")
  const [coupons, setCoupons] = useState([])

  const accessToken = useSelector(state => state.user?.accessToken)
  console.log("🚀 ~ file: CreateCouponPage.jsx ~ line 27 ~ CreateCouponPage ~ accessToken", accessToken)

  useEffect(() => {
    loadAllCoupons()
  }, [])

  const loadAllCoupons = () => getCoupons().then(res => setCoupons(res.data))

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    console.table(name, expiry, discount)
    console.log("🚀 ~ file: CreateCouponPage.jsx ~ line 40 ~ CreateCouponPage ~ accessToken", accessToken)
    createCoupon({ name, expiry, discount }, accessToken)
      .then(res => {
        setLoading(false)
        loadAllCoupons()
        setName("")
        setDiscount("")
        setExpiry("")
        toast.info(`"${res.data.name}" is created`)
      })
      .catch(err => console.log("create coupon err", err))
  }

  const handleRemove = couponId => {
    setLoading(true)
    removeCoupon(couponId, accessToken)
      .then(res => {
        loadAllCoupons()
        setLoading(false)
        toast.error(`Coupon deleted`)
      })
      .catch(err => console.log(err))
  }

  return (
    <Container className="">
      <Row className="">
        <Col md={2} className="">
          <AdminSidebar />
        </Col>
        <Col md={10} className="">
          {loading ? (
            <h4 className="text-black">Loading...</h4>
          ) : (
            <h4>Coupon</h4>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="">
              <Form.Label className="text-muted">Name</Form.Label>
              <Form.Control
                type="text"
                className=""
                onChange={e => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group className="">
              <Form.Label className="text-muted">Discount %</Form.Label>
              <Form.Control
                type="text"
                className=""
                onChange={e => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </Form.Group>

            <Form.Group className="">
              <Form.Label className="text-muted">Expiry date</Form.Label>
              <br />
              <DatePicker
                className="form-control"
                selected={expiry || new Date()}
                value={expiry}
                onChange={date => setExpiry(date)}
                required
              />
            </Form.Group>

            <Button
              onClick={handleSubmit}
              className="text-center btn-dark text-white btn-block mt-4"
            >
              Save
            </Button>
          </Form>

          <br />

          <h4>{coupons.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map(c => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(c._id)}
                      className="text-black pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateCouponPage