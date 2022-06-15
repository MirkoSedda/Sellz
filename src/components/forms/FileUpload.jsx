import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
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
        // TODO remove PayloadTooLargeError: request entity too large
        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720, // maxWidth
                    720, // maxHeight
                    "JPEG",
                    100, // quality
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
                    <Badge
                        count="X"
                        key={image.public_id}
                        onClick={() => handleImageRemove(image.public_id)}
                        style={{ cursor: "pointer" }}>
                        <Avatar
                            src={image.url}
                            size={100}
                            shape="square"
                            className="ml-3"
                        />
                    </Badge>
                ))}
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label className="btn btn-primary">
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
            </Row>
        </Container>
    )
}

export default FileUpload