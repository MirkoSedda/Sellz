import { Card, Skeleton } from "antd"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const LoadingCard = ({ numberOfCards }) => {

  const cards = () => {
    let totalCards = []

    for (let i = 0; i < numberOfCards; i++) {
      totalCards.push(
        <Col md={4}>
          <Card className="">
            <Skeleton active></Skeleton>
          </Card>
        </Col>
      )
    }

    return totalCards
  }

  return <Row className="pb-5">{cards()}</Row>
}

export default LoadingCard