//console.log(JSON.stringify(data, null, 4))
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { lazy, Suspense } from "react"
import { ToastContainer } from "react-toastify"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// import Home from "./pages/home/Home"
// import AdminDashboard from "./pages/admin/dashboard/AdminDashboard"
// import Register from "./pages/auth/Register"
// import Login from "./pages/auth/Login"
// import NavBar from "./components/navbar/NavBar"
// import SideDrawer from "./components/drawer/SideDrawer"
// import Categories from "./pages/admin/categories/Categories"
// import SubCategories from "./pages/admin/subcategories/SubCategories"
// import UpdateCategory from "./pages/admin/categories/UpdateCategory"
// import UpdateSubCategory from "./pages/admin/subcategories/UpdateSubCategory"
// import CreateProduct from "./pages/admin/products/CreateProduct"
// import UpdateProduct from "./pages/admin/products/UpdateProduct"
// import History from "./pages/user/History"
// import Wishlist from "./pages/user/Wishlist"
// import GetAllProducts from "./pages/admin/products/GetAllProducts"
// import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage"
// import Product from "./pages/product/Product"
// import CategoriesList from "./pages/categories/CategoriesList"
// import SubCategoriesList from "./pages/subCategories/SubCategoriesList"
// import Shop from "./pages/shop/Shop"
// import Cart from "./pages/cart/Cart"
// import Checkout from "./pages/checkout/Checkout"
// import Payment from "./pages/payment/Payment"

const Home = lazy(() => import("./pages/home/Home"))
const AdminDashboard = lazy(() =>
  import("./pages/admin/dashboard/AdminDashboard")
)
const Register = lazy(() => import("./pages/auth/Register"))
const Login = lazy(() => import("./pages/auth/Login"))
const NavBar = lazy(() => import("./components/navbar/NavBar"))
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"))
const Categories = lazy(() => import("./pages/admin/categories/Categories"))
const SubCategories = lazy(() =>
  import("./pages/admin/subcategories/SubCategories")
)
const UpdateCategory = lazy(() =>
  import("./pages/admin/categories/UpdateCategory")
)
const UpdateSubCategory = lazy(() =>
  import("./pages/admin/subcategories/UpdateSubCategory")
)
const CreateProduct = lazy(() => import("./pages/admin/products/CreateProduct"))
const UpdateProduct = lazy(() => import("./pages/admin/products/UpdateProduct"))
const History = lazy(() => import("./pages/user/History"))
const Wishlist = lazy(() => import("./pages/user/Wishlist"))
const GetAllProducts = lazy(() =>
  import("./pages/admin/products/GetAllProducts")
)
const CreateCouponPage = lazy(() =>
  import("./pages/admin/coupon/CreateCouponPage")
)
const Product = lazy(() => import("./pages/product/Product"))
const CategoriesList = lazy(() => import("./pages/categories/CategoriesList"))
const SubCategoriesList = lazy(() =>
  import("./pages/subCategories/SubCategoriesList")
)
const Shop = lazy(() => import("./pages/shop/Shop"))
const Cart = lazy(() => import("./pages/cart/Cart"))
const Checkout = lazy(() => import("./pages/checkout/Checkout"))
const Payment = lazy(() => import("./pages/payment/Payment"))

export default function App() {
  return (
    <Suspense fallback={<div>"Loading..."</div>}>
      <Router>
        <NavBar />
        <SideDrawer />
        <ToastContainer />
        <Routes>
          <Route>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/admin/dashboard" exact element={<AdminDashboard />} />
            <Route path="/admin/categories" exact element={<Categories />} />
            <Route
              path="/admin/categories/:slug"
              exact
              element={<UpdateCategory />}
            />
            <Route
              path="/admin/subcategories"
              exact
              element={<SubCategories />}
            />
            <Route
              path="/admin/subcategories/:slug"
              exact
              element={<UpdateSubCategory />}
            />
            <Route path="/admin/product" exact element={<CreateProduct />} />
            <Route
              path="/admin/product/:slug"
              exact
              element={<UpdateProduct />}
            />
            <Route path="/admin/products" exact element={<GetAllProducts />} />
            <Route path="/admin/coupon" exact element={<CreateCouponPage />} />
            <Route path="/user/history" exact element={<History />} />
            <Route path="/user/wishlist" exact element={<Wishlist />} />
            <Route path="/product/:slug" exact element={<Product />} />
            <Route
              path="/categories/:slug"
              exact
              element={<CategoriesList />}
            />
            <Route
              path="/subcategories/:slug"
              exact
              element={<SubCategoriesList />}
            />
          </Route>
          <Route path="/shop" exact element={<Shop />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/checkout" exact element={<Checkout />} />
          <Route path="/payment" exact element={<Payment />} />
        </Routes>
      </Router>
    </Suspense>
  )
}

// import { ProtectedRoutes, PublicRoutes } from "./components/Protected&PublicRoutes"
// import { useDispatch } from "react-redux"
// import { useEffect } from "react"
// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/** Protected Routes */}
//         {/** Wrap all Route under ProtectedRoutes element */}
//         <Route path="/" element={<ProtectedRoutes />}>
//           <Route path="/" element={<InnerContent />}>
//             <Route path="/" element={<Navigate replace to="dashboard" />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="tabs" element={<Tabs />}>
//               <Route path="/tabs" element={<Navigate replace to="tab1" />} />
//               <Route path="tab1" element={<Tab1 />} />
//               <Route path="tab2" element={<Tab2 />} />
//               <Route path="tab3" element={<Tab3 />} />
//             </Route>
//             <Route path="settings" element={<Settings />} />
//             <Route
//               path="users"
//               element={<Users extraItem="test extra item from router" />}
//             />
//             <Route path="users/:userId" element={<SingleUser />} />
//             <Route path="users/new" element={<NewUser />} />
//           </Route>
//         </Route>
//         {/** Public Routes */}
//         {/** Wrap all Route under PublicRoutes element */}
//         <Route path="login" element={<PublicRoutes />}>
//           <Route path="/login" element={<Login />} />
//         </Route>
//       </Routes>
//     </Router>
//   )
// }
