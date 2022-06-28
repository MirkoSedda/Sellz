import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Resizer from "react-image-file-resizer"
import axios from "axios"
import { useSelector } from "react-redux"
import { Avatar, Badge } from "antd"
import { API_URL } from "../../costants"

const FileUpload = ({ values, setValues, setLoading }) => {

    const accessToken = useSelector(state => state.user?.accessToken)

    const fileUploadAndResize = (e) => {

        const files = e.target.files
        const allUploadedFiles = values.images
        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    400, // maxWidth
                    400, // maxHeight
                    "JPEG",
                    90, // quality
                    0, // rotation
                    uri => {
                        console.log(uri);
                        axios.post(`${API_URL}/cloudinary/upload-images`,
                            { image: uri },
                            { headers: { authorization: accessToken } }
                        ).then(res => {
                            console.log(res)
                            setLoading(false)
                            allUploadedFiles.push(res.data)
                            setValues({ ...values, images: allUploadedFiles })
                        })
                            .catch(err => {
                                console.log(err)
                                setLoading(false)
                            })
                    },
                    "base64"
                )
            }
        }
    }

    const handleImageRemove = (public_id) => {
        setLoading(true);
        console.log("remove image", public_id);
        axios
            .post(
                `${API_URL}/cloudinary/delete-image`,
                { public_id },
                { headers: { authorization: accessToken } }
            )
            .then((res) => {
                setLoading(false);
                const { images } = values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id;
                });
                setValues({ ...values, images: filteredImages });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <Container>
            <Row>
                {values?.images?.map(image => (
                    <>
                        <span>
                            <Badge
                                count="X"
                                key={image.public_id}
                                onClick={() => handleImageRemove(image.public_id)}
                                style={{
                                    cursor: "pointer",
                                    position: "absolute",
                                    zIndex: 100,
                                }}
                            >
                            </Badge>
                        </span>
                        <Avatar
                            src={image.url}
                            size={100}
                            shape="square"
                            className="ml-3 mb-3"
                        />
                    </>
                ))}
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label className="ms-5 mb-5 p-2 text-center btn btn-dark text-white">
                            Choose File
                            <Form.Control
                                type="file"
                                multiple
                                hidden
                                accept="images/*"
                                onChange={fileUploadAndResize}
                            />
                        </Form.Label>
                    </Form.Group>
                </Col>
            </Row>
        </Container >
    )
}

export default FileUpload