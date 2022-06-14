

import ModalImage from "react-modal-image";
import defaultImage from "../../images/product-image-placeholder.jpg"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export const ProductCardForCart = ({ p }) => {

  const colors = ["Black", "White", "Red", "Blue", "Green"]

  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      //  console.log('updated color in cart', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={defaultImage} large={defaultImage} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

// import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux";
// import { userCart, getUserCart } from "../../functions/user";
// import ModalImage from "react-modal-image";
// import defaultImage from "../../images/product-image-placeholder.jpg"
// import { toast } from "react-toastify";
// import {
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   CloseOutlined,
// } from "@ant-design/icons";

// export const ProductCardForCart = ({ p }) => {

//   const [cart, setCart] = useState([])
//   console.log("🚀 ~ file: ProductCardForCart.jsx ~ line 17 ~ ProductCardForCart ~ cart", cart)
//   const [loading, setLoading] = useState(false)
//   const colors = ["Black", "White", "Red", "Blue", "Green"]

//   const accessToken = useSelector(state => state.user?.accessToken)

//   const dispatch = useDispatch();

//   useEffect(() => {
//     loadUserCart()
//     // eslint-disable-next-line
//   }, [])

//   const loadUserCart = () => {
//     getUserCart(accessToken).then((res) => {
//       setCart(res.data)
//       console.log("🚀 ~ file: ProductCardForCart.jsx ~ line 33 ~ getUserCart ~ res.data", res.data)
//     })
//   }

//   const saveOrderInDb = (cart) => {
//     setLoading(true)
//     if (cart.length > 1) {
//       userCart(cart, accessToken)
//       console.log("🚀 ~ file: ProductCardForCart.jsx ~ line 41 ~ saveOrderInDb ~ cart", cart)
//         .then((res) => {
//           console.log("🚀 ~ file: Cart.jsx ~ line 43 ~ .then ~ res.data", res.data)
//           res.data && setLoading(false)
//         })
//         .catch((err) => console.log("cart save err", err));
//     }
//   };

//   const handleColorChange = (e) => {
//     console.log("color changed", e.target.value);

//     let cart = [];
//     if (typeof window !== "undefined") {
//       if (localStorage.getItem("cart")) {
//         cart = JSON.parse(localStorage.getItem("cart"));
//       }

//       cart.map((product, i) => {
//         if (product._id === p._id) {
//           cart[i].color = e.target.value;
//         }
//       });

//       //  console.log('updated color in cart', cart)
//       setCart(cart);
//       console.log("🚀 ~ file: ProductCardForCart.jsx ~ line 63 ~ handleColorChange ~ cart", cart)
//       saveOrderInDb(cart)
//       localStorage.setItem("cart", JSON.stringify(cart));
//       dispatch({
//         type: "ADD_TO_CART",
//         payload: cart,
//       });
//     }
//   };

//   const handleQuantityChange = (e) => {
//     // console.log("available quantity", p.quantity);
//     let count = e.target.value < 1 ? 1 : e.target.value;

//     if (count > p.quantity) {
//       toast.error(`Max available quantity: ${p.quantity}`);
//       return;
//     }

//     let cart = [];

//     if (typeof window !== "undefined") {
//       if (localStorage.getItem("cart")) {
//         cart = JSON.parse(localStorage.getItem("cart"));
//       }

//       cart.map((product, i) => {
//         if (product._id == p._id) {
//           cart[i].count = count;
//         }
//       });

//       setCart(cart);
//       console.log("🚀 ~ file: ProductCardForCart.jsx ~ line 96 ~ handleQuantityChange ~ cart", cart)
//       saveOrderInDb(cart)
//       localStorage.setItem("cart", JSON.stringify(cart));
//       dispatch({
//         type: "ADD_TO_CART",
//         payload: cart,
//       });
//     }
//   };

//   const handleRemove = () => {
//     // console.log(p._id, "to remove");
//     let cart = [];

//     if (typeof window !== "undefined") {
//       if (localStorage.getItem("cart")) {
//         cart = JSON.parse(localStorage.getItem("cart"));
//       }
//       // [1,2,3,4,5]
//       cart.map((product, i) => {
//         if (product._id === p._id) {
//           cart.splice(i, 1);
//         }
//       });

//       setCart(cart);
//       console.log("🚀 ~ file: ProductCardForCart.jsx ~ line 122 ~ handleRemove ~ cart", cart)
//       saveOrderInDb(cart)
//       localStorage.setItem("cart", JSON.stringify(cart));
//       dispatch({
//         type: "ADD_TO_CART",
//         payload: cart,
//       });
//     }
//   };

//   return (
//     <tbody>
//       <tr>
//         <td>
//           <div style={{ width: "100px", height: "auto" }}>
//             {p.images.length ? (
//               <ModalImage small={p.images[0].url} large={p.images[0].url} />
//             ) : (
//               <ModalImage small={defaultImage} large={defaultImage} />
//             )}
//           </div>
//         </td>
//         <td>{p.title}</td>
//         <td>${p.price}</td>
//         <td>{p.brand}</td>
//         <td>
//           <select
//             onChange={handleColorChange}
//             name="color"
//             className="form-control"
//           >
//             {p.color ? (
//               <option value={p.color}>{p.color}</option>
//             ) : (
//               <option>Select</option>
//             )}
//             {colors
//               .filter((c) => c !== p.color)
//               .map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//           </select>
//         </td>
//         <td className="text-center">
//           <input
//             type="number"
//             className="form-control"
//             value={p.count}
//             onChange={handleQuantityChange}
//           />
//         </td>
//         <td className="text-center">
//           {p.shipping === "Yes" ? (
//             <CheckCircleOutlined className="text-success" />
//           ) : (
//             <CloseCircleOutlined className="text-danger" />
//           )}
//         </td>
//         <td className="text-center">
//           <CloseOutlined
//             onClick={handleRemove}
//             className="text-danger pointer"
//           />
//         </td>
//       </tr>
//     </tbody>
//   );
// };
