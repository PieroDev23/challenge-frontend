import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";



export const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}