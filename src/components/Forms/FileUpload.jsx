import { Container, Row } from "react-bootstrap"
import Resizer from "react-image-file-resizer"
import axios from "axios"
import { useSelector } from "react-redux"
import { Avatar, Badge } from "antd"
import { API_URL } from "../../costants"

export const FileUpload = ({ values, valuesSetter, loadingSetter }) => {

  const accessToken = useSelector(state => state.userReducer?.accessToken)

  const fileUploadAndResize = (e) => {

    const files = e.target.files
    const allUploadedFiles = values.images

    if (files) {
      loadingSetter(true)
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
              loadingSetter(false)
              allUploadedFiles.push(res.data)
              valuesSetter({ ...values, images: allUploadedFiles })
            })
              .catch(err => {
                console.log(err)
                loadingSetter(false)
              })
          },
          "base64"
        )
      }
    }
  }

  const handleImageRemove = (public_id) => {
    loadingSetter(true);
    console.log("remove image", public_id);
    axios
      .post(
        `${API_URL}/cloudinary/delete-image`,
        { public_id },
        { headers: { authorization: accessToken } }
      )
      .then((res) => {
        loadingSetter(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        valuesSetter({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        loadingSetter(false);
      });
  };

  return (
    <Container>
      <Row>
        {values.images &&
          values.images.map(image => (
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
        <label className="btn btn-primary">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </Row>
    </Container>
  )
}