import { Link } from "react-router-dom";
import { Card } from "antd";
import defaultImage from "../../images/product-image-placeholder.jpg"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  console.log(product)

  return (
    <Card
      cover={
        <img
          src={images?.length ? images[0].url : defaultImage}
          alt={`${title}`}
          style={{ height: "150px", objectFit: "cover" }
          }
          className="p-1"
        />
      }
      actions={
        [
          <Link to={`/admin/product/${slug}`}>
            <EditOutlined className="text-warning" />
          </Link>,
          <DeleteOutlined
            onClick={() => handleRemove(slug)}
            className="text-danger"
          />,
        ]}
    >
      <Meta
        title={title}
        description={`${description?.substring(0, 40)}...`}
      />
    </Card >
  );
};

export default AdminProductCard;
