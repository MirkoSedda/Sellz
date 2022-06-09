//console.log(JSON.stringify(data, null, 4))
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from "react-toastify"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/home/Home"
import { AdminDashboard } from "./pages/admin/AdminDashboard"
import { Register } from "./pages/auth/Register"
import { Login } from "./pages/auth/Login"
import { NavBar } from "./components/navbar/NavBar"
import { Categories } from "./pages/admin/categories/Categories"
import { SubCategories } from "./pages/admin/subcategories/SubCategories"
import { UpdateCategory } from "./pages/admin/categories/UpdateCategory"
import { UpdateSubCategory } from "./pages/admin/subcategories/UpdateSubCategory"
import { CreateProduct } from "./pages/admin/products/CreateProduct"
import { UpdateProduct } from "./pages/admin/products/UpdateProduct"
import { History } from "./pages/user/History"
import { Wishlist } from "./pages/user/Wishlist"
import { GetAllProducts } from "./pages/admin/products/GetAllProducts"
import { Product } from "./pages/product/product"
import { CategoriesList } from "./pages/categories/CategoriesList"
import { SubCategoriesList } from "./pages/subCategories/SubCategoriesList"
import { Shop } from "./pages/shop/Shop"
import { Cart } from "./pages/cart/Cart"

export default function App() {
  return (
    <Router>
      <NavBar />
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
          <Route path="/user/history" exact element={<History />} />
          <Route path="/user/wishlist" exact element={<Wishlist />} />
          <Route path="/product/:slug" exact element={<Product />} />
          <Route path="/categories/:slug" exact element={<CategoriesList />} />
          <Route
            path="/subcategories/:slug"
            exact
            element={<SubCategoriesList />}
          />
        </Route>
        <Route path="/shop" exact element={<Shop />} />
        <Route path="/cart" exact element={<Cart />} />
      </Routes>
    </Router>
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
