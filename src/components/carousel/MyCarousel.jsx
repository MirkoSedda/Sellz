
import Carousel from "react-bootstrap/Carousel";
import apple1 from "../../images/apple1.webp"
import apple2 from "../../images/apple2.jpg"
import apple3 from "../../images/apple3.jpg"
import apple4 from "../../images/apple4.jpg"
import apple5 from "../../images/apple5.jpg"


const MyCarousel = () => {

    return (

        <Carousel className="">
            <Carousel.Item>
                <img
                    className="d-block"
                    style={{ height: "400px", objectFit: "cover" }}
                    src={apple1}
                    alt="First slide"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block"
                    style={{ height: "400px", objectFit: "cover" }}
                    src={apple2}
                    alt="Second slide"
                />

            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block"
                    style={{ height: "400px", objectFit: "cover" }}
                    src={apple3}
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block"
                    style={{ height: "400px", objectFit: "cover" }}
                    src={apple4}
                    alt="Fourth slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block"
                    style={{ height: "400px", objectFit: "cover" }}
                    src={apple5}
                    alt="Fifth slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}

export default MyCarousel