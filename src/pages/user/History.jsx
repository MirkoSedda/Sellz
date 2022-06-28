
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getUserOrders } from "../../functions/user";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import UserSidebar from "../../components/sidebars/UserSidebar";

const History = () => {

    //TODO download the invoice for the orders 

    const accessToken = useSelector(state => state.user?.accessToken)

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadUserOrders();
        // eslint-disable-next-line 
    }, []);

    const loadUserOrders = () =>
        getUserOrders(accessToken).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    const showOrderInTable = (order) => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
                {order?.products?.map((p, i) => (
                    <tr key={i}>
                        <td>
                            <b>{p?.product?.title}</b>
                        </td>
                        <td>{p?.product?.price}</td>
                        <td>{p?.product?.brand}</td>
                        <td>{p?.color}</td>
                        <td>{p?.count}</td>
                        <td>
                            {p?.product?.shipping === "Yes" ? (
                                <CheckCircleOutlined style={{ color: "green" }} />
                            ) : (
                                <CloseCircleOutlined style={{ color: "red" }} />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const showEachOrders = () =>
        orders.map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                <ShowPaymentInfo order={order} />
                {showOrderInTable(order)}
                <div className="row">
                    <div className="col">
                    </div>
                </div>
            </div>
        ));

    return (
        <Container className="mt-5">
            <Row>
                <Col md={2}>
                    <UserSidebar />
                </Col>
                <Col md={10} className="text-center">
                    <h4>
                        {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
                    </h4>
                    {showEachOrders()}
                </Col>
            </Row>
        </Container>
    )
}

export default History;