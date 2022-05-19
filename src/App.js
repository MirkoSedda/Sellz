import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import NavBar from "./components/NavBar"
// import {
//   ProtectedRoutes,
//   PublicRoutes,
// } from "./components/Protected&PublicRoutes"
// import { useDispatch } from "react-redux"
// import { useEffect } from "react"

export default function App() {
  //const dispatch = useDispatch()

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route>
          <Route path="/" exact element={<Home />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
        </Route>
      </Routes>
    </Router>
  )
}

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
