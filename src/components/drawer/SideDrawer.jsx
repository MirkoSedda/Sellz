
import { Drawer } from "antd";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import defaultImage from "../../images/product-image-placeholder.jpg"

const SideDrawer = () => {
  const dispatch = useDispatch();
  const drawer = useSelector((state) => (state.drawer));
  console.log("🚀 ~ file: SideDrawer.jsx ~ line 11 ~ SideDrawer ~ drawer", drawer)
  const cart = useSelector((state) => (state.cart));
  console.log("🚀 ~ file: SideDrawer.jsx ~ line 13 ~ SideDrawer ~ cart", cart)

  const imageStyle = {
    width: "100%",
    height: "50px",
    objectFit: "cover",
  };

  return (
    <Drawer
      className="text-center"
      title={`Cart ~ ${cart.length} Product`}
      placement="right"
      closable={false}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} alt="" />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <img src={defaultImage} style={imageStyle} alt="" />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      <Link to="/cart">
        <Button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          className="text-center btn-dark text-white btn-block"
        >
          Go To Cart
        </Button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;