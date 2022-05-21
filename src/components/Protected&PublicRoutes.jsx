
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux"

const useAuth = () => {
    const user = useSelector((state) => state.userReducer?.user)
    // const user = localStorage.getItem("user")
    console.log(user)
    if (user) return true
    if (!user) return false
}

export const ProtectedRoutes = () => {
    const auth = useAuth()
    return auth ? <Outlet /> : <Navigate to="/login" />
}

export const PublicRoutes = () => {
    const auth = useAuth()
    return auth ? <Navigate to="/" /> : <Outlet />
}