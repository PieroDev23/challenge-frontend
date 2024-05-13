import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";
import { useEffect } from "react";


export const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        console.log(isAuthenticated)
    }, [])

    return isAuthenticated ? <Outlet /> : <Navigate to={'/'} replace />
}