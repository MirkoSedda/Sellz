import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import NavBar from "./components/NavBar"
// import { useDispatch } from "react-redux"
// import { useEffect } from "react"

export default function App() {
  //const dispatch = useDispatch()

  // useEffect(() => {
  //   const dispatchUser = async () => {
  //     const accessToken = await JSON.parse(
  //       window.localStorage.getItem("accessToken")
  //     )
  //     const user = await JSON.parse(window.localStorage.getItem("user"))
  //     console.log("app user", user)
  //     dispatch({
  //       type: "LOGIN",
  //       payload: {
  //         user,
  //         accessToken,
  //       },
  //     })
  //   }
  //   dispatchUser()
  // }, [])

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
        </Route>
      </Routes>
    </Router>
  )
}
