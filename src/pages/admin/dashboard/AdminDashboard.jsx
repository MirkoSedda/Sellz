import { useState, useEffect } from "react"
import { getOrders, changeOrderStatus } from "../../../functions/admin"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import AdminSidebar from "../../../components/sidebars/AdminSidebar"
import Orders from "../../../components/orders/Orders"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const AdminDashboard = () => {
    const [orders, setOrders] = useState([])

    const accessToken = useSelector(state => state.user?.accessToken)

    useEffect(() => {
        loadOrders()
        // eslint-disable-next-line
    }, [])

    const loadOrders = () =>
        getOrders(accessToken).then(res => {
            console.log(JSON.stringify(res.data, null, 4))
            setOrders(res.data)
        })

    const handleStatusChange = (orderId, orderStatus) => {
        changeOrderStatus(orderId, orderStatus, accessToken).then(res => {
            toast.info(`Order status updated to "${orderStatus}"`)
            loadOrders()
        })
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col md={2}>
                    <AdminSidebar />
                </Col>
                <Col md={10}>
                    <h4 className="mb-5 text-center">Admin dashboard</h4>
                    <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminDashboard